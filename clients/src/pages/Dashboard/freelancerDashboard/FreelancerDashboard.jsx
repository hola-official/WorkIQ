import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import {
	DollarSign,
	LayoutList,
	Users,
	Replace,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FreelancerEarningsChart from "./components/FreelancerEarningChart";
import { useAxiosInstance } from "../../../../api/axios";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/Columns";
import userAtom from "@/atoms/userAtom";
import { useRecoilValue } from "recoil";
import PieChart from "./components/PieChart";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Avatar, Image } from "@chakra-ui/react";
import { AvatarFallback } from "@/ui/avatar";
import { formatPrice } from "@/lib/format";

const BADGE_CRITERIA = {
	TOTAL_POINTS: {
		BRONZE: 600,
		SILVER: 1000,
		GOLD: 5000,
	},
};

const calculateBadgeProgress = (totalPoints) => {
	const bronzeThreshold = BADGE_CRITERIA.TOTAL_POINTS.BRONZE;
	const silverThreshold = BADGE_CRITERIA.TOTAL_POINTS.SILVER;
	const goldThreshold = BADGE_CRITERIA.TOTAL_POINTS.GOLD;

	let bronzeProgress, silverProgress, goldProgress;

	if (totalPoints >= goldThreshold) {
		bronzeProgress = 100;
		silverProgress = 100;
		goldProgress = 100;
	} else if (totalPoints >= silverThreshold) {
		bronzeProgress = 100;
		silverProgress = 100;
		goldProgress = ((totalPoints - silverThreshold) / (goldThreshold - silverThreshold)) * 100;
	} else if (totalPoints >= bronzeThreshold) {
		bronzeProgress = 100;
		silverProgress = ((totalPoints - bronzeThreshold) / (silverThreshold - bronzeThreshold)) * 100;
		goldProgress = 0;
	} else {
		bronzeProgress = (totalPoints / bronzeThreshold) * 100;
		silverProgress = 0;
		goldProgress = 0;
	}

	return [
		{ name: "Bronze", value: parseFloat(bronzeProgress.toFixed(2)) },
		{ name: "Silver", value: parseFloat(silverProgress.toFixed(2)) },
		{ name: "Gold", value: parseFloat(goldProgress.toFixed(2)) }
	];
};
const FreelancerDashboard = ({ setDashboardMode }) => {
	const userInfo = useRecoilValue(userAtom);
	const axiosInstance = useAxiosInstance();
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await axiosInstance.get("users/freelancer-stats");
				setStats(response.data);
				setLoading(false);
			} catch (err) {
				setError("Error fetching freelancer stats");
				setLoading(false);
				console.error(err);
			}
		};

		fetchStats();
	}, []);

	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message="Error fetching freelancer stats" />;


	const pieChartData = [
		// ...stats?.pieChartData?.successRate.map(rate => ({
		//   name: rate.name,
		//   value: rate.value,
		//   color: rate.color || '#000000', // Use a default color if not specified
		// })),
		...calculateBadgeProgress(stats?.totalPoints || 0),
		...stats?.pieChartData?.earningRate.map(earning => ({
			name: earning.name,
			value: earning.value,
			color: earning.color || '#000000', // Use a default color if not specified
		})),
		{
			name: "Avg Completion Time",
			value: stats?.avgCompletionTime?.value || 100,
			color: '#4CAF50',
		},
		{
			name: "Cancellation Impact",
			value: 100 - (stats?.avgCompletionTime?.value || 100),
			color: '#FF5722',
		}
		// ...stats?.pieChartData?.avgCompletionTime.map(time => ({
		// 	name: time.name,
		// 	value: time.value,
		// 	color: time.color || '#000000', // Use a default color if not specified
		// })),
	];
	console.log(stats)
	return (
		<div className="flex-1 space-y-6">
			<HeaderSection
				userInfo={userInfo}
				stats={stats}
				balance={stats?.currentBalance}
				totalEarnings={stats?.totalEarnings}
				isVerified={userInfo?.isVerified}
			/>
			<StatCards
				stats={stats}
				userInfo={userInfo}
			/>
			<MainContent
				stats={stats}
				pieChartData={pieChartData}
				recentWithdrawals={stats?.pieChartData?.recentWithdrawals}
				recentDeposits={stats?.pieChartData?.totalDeposits}
				userInfo={userInfo}
			/>
		</div>
	);
};

const HeaderSection = React.memo(({ userInfo, balance, totalEarnings, isVerified }) => (
	<div
		style={{
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.05)), url(/freelancer-bg.webp)`,
			backgroundSize: "cover",
			backgroundPosition: "center",
		}}
		className="bg-slate-300 p-8 lg:p-14 rounded-3xl space-y-2 lg:space-y-5 flex justify-between items-center xl:flex-col-reverse xl:items-stretch"
	>
		<div className="xl:w-full xl:flex xl:justify-start">
			<div>
				<div className="flex gap-1">
					<Avatar>
						<Image className="rounded-full" src={userInfo?.avatar} />
					</Avatar>
					<h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">
						Welcome, {userInfo?.username}
					</h1>
				</div>
				<h1 className="text-xs md:text-lg text-white/60 xl:text-xl">
					See what happened with your tasks and earnings
				</h1>
			</div>
		</div>
		<div className="flex flex-col gap-2 xl:w-full xl:flex xl:justify-end xl:mb-4">
			<h1 className="text-base md:text-2xl xl:text-3xl font-semibold text-white text-right max-md:hidden">
				{isVerified === true ? "Total Earnings" : "Balance"}
			</h1>
			<h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white text-right">
				$ {isVerified === true ? totalEarnings?.toFixed(2) ?? 0 : balance?.toFixed(2)}
			</h1>
		</div>
	</div>
));

const StatCards = React.memo(({ stats, userInfo }) => {
	const statCardItems = [
		{
			icon: <DollarSign />,
			title: userInfo?.isVerified === true ? "Balance" : "Freezed",
			value: userInfo?.isVerified === true ? `$${stats?.currentBalance?.toFixed(2) ?? 0}` : `${formatPrice(userInfo?.escrowBalance)}`
		},
		{
			icon: <LayoutList />,
			title: userInfo?.isVerified === true ? "Completed Tasks" : "Task Created",
			value: userInfo?.isVerified === true ? `${stats?.totalTasksCompleted ?? 0} Tasks` : `${userInfo?.tasksCreated.length} Created`
		},
		{
			icon: <LayoutList />,
			title: "Success Rate",
			value: `${stats?.successRate?.toFixed(2) ?? 0}%`
		},
		userInfo?.isVerified === true && {
			icon: <Users />,
			title: "Total Points",
			value: `${stats?.totalPoints ?? 0} Points`
		},
		{
			icon: <DollarSign />,
			title: "Total Withdrawals",
			value: `${formatPrice(stats?.totalWithdrawals) ?? 0}`
		},
		{
			icon: <DollarSign />,
			title: "Total Deposits",
			value: `$${stats?.totalDeposits ?? 0}`
		}
	];

	return (
		<div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-5">
			{statCardItems.map((item, index) => (
				item && <StatCard key={index} icon={item.icon} title={item.title} value={item.value} />
			))}
		</div>
	);
});

const MainContent = React.memo(({ stats, pieChartData, recentWithdrawals, recentDeposits, userInfo }) => (
	<div className="flex flex-wrap w-full gap-6">
		{userInfo?.isVerified === false && <div className="rounded-lg w-full border-gray-300/55"><FreelancerEarningsChart stats={stats} /></div>}
		{userInfo?.isVerified === true && <div className="grid grid-cols-1 lg:grid-cols-2 xl:col-span-2 items-center border w-full">
			<div className="rounded-lg border-gray-300/55"><FreelancerEarningsChart stats={stats} /></div>
			<div className="rounded-lg border-gray-300/55 bg-white">{pieChartData.length > 0 && <PieChart data={pieChartData} />}</div>
		</div>}
		<div className="col-span-1 w-full">
			<div className="border rounded-lg border-gray-300/55 p-4">
				{/* <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Recent Orders
        </h2> */}
				<DataTable
					data={stats?.allOrders ?? []}
					columns={columns}
				/>
			</div>
			{/* Add a new section for recent withdrawals and deposits */}
			{/* <div className="border rounded-lg border-gray-300/55 p-4 mt-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Recent Withdrawals
        </h2>
        <DataTable
          data={recentWithdrawals ?? []}
          columns={columns}  // Make sure you have appropriate columns defined for this data
        />
      </div>
      <div className="border rounded-lg border-gray-300/55 p-4 mt-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Total Deposits
        </h2>
        <DataTable
          data={recentDeposits ?? []}
          columns={columns}  // Make sure you have appropriate columns defined for this data
        />
      </div> */}
		</div>
	</div>
));

const StatCard = React.memo(({ icon, title, value }) => (
	<div className="p-5 col-span-1 bg-gray-50 shadow-lg rounded-lg space-y-4">
		<div className="flex gap-2 items-center">
			<div className="p-2 shadow rounded-full">
				{icon}
			</div>
			<h3 className="text-lg md:text-2xl xl:text-3xl">{value}</h3>
		</div>
		<div>
			<p className="text-sm md:text-base lg:text-lg text-gray-300">{title}</p>
		</div>
	</div>
));

export default FreelancerDashboard;
