import {
  Box,
  Flex,
  Input,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Grid,
  GridItem,
  VStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../../../hooks/useShowToast";
import { useAxiosInstance } from "../../../../api/axios";
import useErrorHandler from "../../../hooks/useErrorHandler";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    durationDays: "",
    categoryId: "",
    skills: [],
    doc: "",
    sections: [{ title: "", description: "", timeframe: "", price: "" }],
  });
  const showToast = useShowToast();
  const axiosInstance = useAxiosInstance();
  const errorHandler = useErrorHandler();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSections = [...formData.sections];
    updatedSections[index][name] = value;
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { title: "", description: "", timeframe: "", price: "" },
      ],
    });
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...formData.sections];
    updatedSections.splice(index, 1);
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  const handleSkillsChange = (e) => {
    const { value } = e.target;
    const newSkills = value.split(/[,\n]+/).map((skill) => skill.trim());
    setFormData({ ...formData, skills: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("durationDays", formData.durationDays);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("skills", formData.skills.join(","));
      formDataToSend.append("doc", formData.doc);
      formData.sections.forEach((section, index) => {
        formDataToSend.append(`sections[${index}][title]`, section.title);
        formDataToSend.append(
          `sections[${index}][description]`,
          section.description
        );
        formDataToSend.append(
          `sections[${index}][timeframe]`,
          section.timeframe
        );
        formDataToSend.append(`sections[${index}][price]`, section.price);
      });

      const res = await axiosInstance.post(`/tasks/create`, formDataToSend);
      const data = res.data;

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Task created successfully", "success");
      console.log(data);
    } catch (error) {
      if (error.response.message) {
        showToast("Error", error.response.message, "error");
      } else {
        errorHandler(error);
      }
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex justify="center">
        <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" w="80%">
          <VStack spacing={4} align="stretch">
            <FormControl isRequired isInvalid={!!formData.title.error}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
              />
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={!!formData.description.error}
            >
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description"
              />
              <FormErrorMessage>{formData.description.error}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={!!formData.price.error}
            >
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Price"
              />
              <FormErrorMessage>{formData.price.error}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={!!formData.durationDays.error}
            >
              <FormLabel>Duration (Days)</FormLabel>
              <Input
                name="durationDays"
                type="number"
                value={formData.durationDays}
                onChange={(e) =>
                  setFormData({ ...formData, durationDays: e.target.value })
                }
                placeholder="Duration (Days)"
              />
              <FormErrorMessage>{formData.durationDays.error}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt={4}
              isRequired
              isInvalid={!!formData.categoryId.error}
            >
              <FormLabel>Category</FormLabel>
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                placeholder="Select category"
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Writing">Writing</option>
                <option value="Translation">Translation</option>
                <option value="Data Entry">Data Entry</option>
                <option value="Virtual Assistant">Virtual Assistant</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
                <option value="Accounting & Consulting">Accounting & Consulting</option>
                <option value="Legal">Legal</option>
                <option value="Engineering & Architecture">Engineering & Architecture</option>
                <option value="IT & Networking">IT & Networking</option>
                <option value="Admin Support">Admin Support</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={!formData.skills.error}>
              <FormLabel>Skills</FormLabel>
              <Input
                name="skills"
                value={formData.skills.join(", ")}
                onChange={handleSkillsChange}
                placeholder="Enter skills (comma-separated or press enter)"
              />
              <FormErrorMessage>{formData.skills.error}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Upload Document</FormLabel>
              <Input
                name="doc"
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, doc: e.target.files[0] })
                }
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} align="stretch">
            {/* Add sections */}
            <UnorderedList listStyleType="none">
              {formData.sections.map((section, index) => (
                <ListItem key={index} mt={4}>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem colSpan={1}>
                      <FormLabel>Section Title</FormLabel>
                      <Input
                        name="title"
                        value={section.title}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Section Title"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormLabel>Section Description</FormLabel>
                      <Textarea
                        name="description"
                        value={section.description}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Section Description"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormLabel>Section Timeframe (Days)</FormLabel>
                      <Input
                        name="timeframe"
                        value={section.timeframe}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Section Timeframe (Days)"
                      />
                    </GridItem>
                    <GridItem colSpan={1}>
                      <FormLabel>Section Price</FormLabel>
                      <Input
                        name="price"
                        type="number"
                        value={section.price}
                        onChange={(e) => handleChange(e, index)}
                        placeholder="Section Price"
                      />
                    </GridItem>
                  </Grid>
                  <Button
                    mt={4}
                    colorScheme="red"
                    onClick={() => handleRemoveSection(index)}
                  >
                    Remove Section
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>
            <Button mt={4} onClick={handleAddSection}>
              Add Section
            </Button>
          </VStack>

          <Button mt={4} colorScheme="blue" type="submit">
            Create Task
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default CreateForm;
