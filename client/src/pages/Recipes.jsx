import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { RecipeCard } from "../components/RecipeCard";
import "./Recipes.css";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spacer,
  
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function Recipes() {


  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Tomato soup");

  const options = {
    method: "GET",
    url: "https://food-recipes-with-images.p.rapidapi.com/",
    params: { q: searchTerm },
    headers: {
      "X-RapidAPI-Key": "e75cfb1ed5msh7bf6d1e4b30f20dp19e63djsn753f6ba3a8df",
      "X-RapidAPI-Host": "food-recipes-with-images.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else if (typeof response.data === "object") {
          setRecipes([response.data]);
        } else {
          console.error(
            "Invalid API response format. Expected an array or object."
          );
        }
        console.log(response.data.d);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  

  return (

    <>
     <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        bg="teal.500"
        color="white"
      >
        <Box>
          <Link fontWeight="bold" fontSize="lg">
            Om - Foodie
          </Link>
        </Box>

        <Box>
          <InputGroup className="Search_bar">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Search for recipes..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Box>
        <Spacer />

        <Box>
  <Link as={RouterLink} to="/recipes" mr={4}>
    Home
  </Link>
  <Link as={RouterLink} to="/bookmarks" mr={4}>
    Bookmarks
  </Link>
  <Link as={RouterLink} to="/login" mr={4}>
    Logout
  </Link>
  {localStorage.getItem("token") ? (
  <></>
) : (
  <Link as={RouterLink} to="/" mr={4}>
    Login
  </Link>
)}
</Box>
      </Flex>
      <div className="card-section">
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </>
  );
}

export default Recipes;
