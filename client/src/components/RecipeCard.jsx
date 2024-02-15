import * as React from "react";
import { Box, Text, Card, Image, Stack, Heading, Divider, Button, ButtonGroup } from "@chakra-ui/react";
import "./RecipeCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios here

export function RecipeCard(props) {
  const navigate = useNavigate();

  const recipes = props.recipe.d || [];

  const handleClick = (recipeItem) => {
    navigate(`/RecipeDetail/${recipeItem.id}`)
    console.log(recipeItem.id);
  }

  const handleBookmark = async (recipeItem) => {
    try {
      const token = localStorage.getItem('token');

      await axios.post(
        "http://localhost:8000/user/bookmark",
        {
          id : recipeItem.id,
          title: recipeItem.Title,
          image: recipeItem.Image,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Recipe bookmarked successfully!");
    } catch (error) {
      console.error("Error bookmarking recipe", error);
    }
  
  };

  return (
    <div className="recipe-cards-area">
      {recipes.map((recipeItem, index) => (
        <div className="recipe-cards" key={index}>
          <Card maxW='sm' borderRadius="lg" boxShadow="md" mb="4" height={400} width={300}>
            {recipeItem.Image && (
              <Image src={recipeItem.Image} alt="Recipe" borderTopRadius="lg" />
            )}
            <Box p="6" width="100%">
              <Stack spacing="3" width="100%">
                <Heading size="md">{recipeItem.Title}</Heading>
              </Stack>
            </Box>
            <Divider />
            <Box p="6" width="100%">
              <ButtonGroup spacing='2'>
                <Button
                  variant='solid' 
                  colorScheme='blue'
                  onClick={() => handleBookmark(recipeItem)}
                >
                  BookMark
                </Button>
                <Button
                  variant='solid' 
                  colorScheme='blue'
                  onClick={() => handleClick(recipeItem)}
                >
                  View Details
                </Button>
              </ButtonGroup>
            </Box>
          </Card>
        </div>
      ))}
    </div>
  );
}
