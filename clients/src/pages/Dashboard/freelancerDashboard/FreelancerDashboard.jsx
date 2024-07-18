import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import {
	CircleDollarSign,
	Book,
	BookCheck,
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
import { Nested } from '@alptugidin/react-circular-progress-bar'
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { Avatar, Image } from "@chakra-ui/react";
import { AvatarFallback } from "@/ui/avatar";
import { formatPrice } from "@/lib/format";

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

	console.log(stats);
	if (loading) return <Spinner />;
	if (error) return <ErrorMessage message="Error fetching freelancer stats" />;

	const pieChartData = [
		...stats?.pieChartData?.badges.map(badge => ({
			name: badge.name,
			value: badge.value,
			color: badge.color || '#000000', // Use a default color if not specified
		})),
		...stats?.pieChartData?.successRate.map(rate => ({
			name: rate.name,
			value: rate.value,
			color: rate.color || '#000000', // Use a default color if not specified
		})),
		...stats?.pieChartData?.earningRate.map(earning => ({
			name: earning.name,
			value: earning.value,
			color: earning.color || '#000000', // Use a default color if not specified
		})),
		...stats?.pieChartData?.avgCompletionTime.map(time => ({
			name: time.name,
			value: time.value,
			color: time.color || '#000000', // Use a default color if not specified
		})),
	];

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

const StatCards = React.memo(({ stats, userInfo }) => (
	<div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-5">
		<StatCard
			icon={<CircleDollarSign />}
			title={userInfo?.isVerified === true ? "Balance" : "Freezed"}
			value={userInfo?.isVerified === true ? `$${stats?.currentBalance?.toFixed(2) ?? 0}` : `${formatPrice(userInfo?.escrowBalance)}`}
		/>
		<StatCard
			icon={<Book />}
			title={userInfo?.isVerified === true ? "Completed Tasks" : "Task Created"}
			value={userInfo?.isVerified === true ? `${stats?.totalTasksCompleted ?? 0} Tasks` : `${userInfo?.tasksCreated.length} Created`}
		/>
		<StatCard
			icon={<BookCheck />}
			title="Success Rate"
			value={`${stats?.successRate?.toFixed(2) ?? 0}%`}
		/>
		{userInfo?.isVerified === true && <StatCard
			icon={<Users />}
			title="Total Points"
			value={`${stats?.totalPoints ?? 0} Points`}
		/>}
		<StatCard
			icon={<CircleDollarSign />}
			title="Total Withdrawals"
			value={`${formatPrice(stats?.totalWithdrawals) ?? 0}`}
		/>
		<StatCard
			icon={<CircleDollarSign />}
			title="Total Deposits"
			value={`$${stats?.totalDepositse ?? 0}`}
		/>
	</div>
));

const MainContent = React.memo(({ stats, pieChartData, recentWithdrawals, recentDeposits, userInfo }) => (
	<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:col-span-2 border">
			<div className="rounded-lg border-gray-300/55"><FreelancerEarningsChart stats={stats} /></div>
			{userInfo?.isVerified === true && <div className="rounded-lg border-gray-300/55">{pieChartData.length > 0 && <PieChart data={pieChartData} />}</div>}
		</div>
		<div className="col-span-1 w-full">
			<div className="border rounded-lg border-gray-300/55 p-4">
				<h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
					Recent Orders
				</h2>
				<DataTable
					data={stats?.allOrders ?? []}
					columns={columns}
				/>
			</div>
			{/* Add a new section for recent withdrawals and deposits */}
			<div className="border rounded-lg border-gray-300/55 p-4 mt-4">
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
			</div>
		</div>
	</div>
));

const StatCard = React.memo(({ icon, title, value }) => (
	<div className="p-5 col-span-1 bg-gray-50 shadow-md rounded-lg space-y-4">
		<div className="flex gap-2 items-center">
			<div className="p-2 shadow-md rounded-md">
				{icon}
			</div>
			<p className="text-sm md:text-base lg:text-lg">{title}</p>
		</div>
		<div>
			<h3 className="text-lg md:text-2xl xl:text-3xl">{value}</h3>
		</div>
	</div>
));

export default FreelancerDashboard;
