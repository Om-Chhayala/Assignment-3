import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Text,
  Heading,
  Stack,
  CardBody,
  Card,
  CardHeader,
  StackDivider,
  Container,
} from "@chakra-ui/react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipeData, setRecipeData] = useState({ d: [] });

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://food-recipes-with-images.p.rapidapi.com/",
        params: { q: id },
        headers: {
          "X-RapidAPI-Key":
            "684e58bcb9msha29ba56d818ef49p1805c5jsn4fdb9170fd41",
          "X-RapidAPI-Host": "food-recipes-with-images.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setRecipeData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {recipeData.d.map((recipeItem, index) => (
        <div key={index}>
          <Box>
            <Container maxW='container.lg' centerContent><Heading mb={4} centerContent>{recipeItem.Title}</Heading></Container>
            <Card>
              <CardHeader>
                <Heading size="md">Ingredients</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Text pt="2" fontSize="sm">
                    {Object.values(recipeItem.Ingredients).map(
                      (ingri, ingriIndex) => (
                        <Text key={ingriIndex} fontSize="sm">
                          {ingriIndex + 1}. {ingri}
                        </Text>
                      )
                    )}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Card>
            <CardHeader>
              <Heading size="md">Recipe Instructions</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Text pt="2" fontSize="sm">
                  {recipeItem.Instructions}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </div>
      ))}
    </>
  );
}

export default RecipeDetail;
