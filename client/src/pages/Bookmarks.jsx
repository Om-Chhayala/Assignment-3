import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Card,
  Image,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import "./bookmarks.css";
const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/bookmarks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookmarks(response.data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (bookmark) => {
    navigate(`/RecipeDetail/${bookmark.id}`);
    console.log(bookmark.id);
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
      <div>
        <div className="bookmark-card-section">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark, index) => (
              <div className="bookmark-recipe-cards" key={index}>
                <Card
                  maxW="sm"
                  borderRadius="lg"
                  boxShadow="md"
                  mb="4"
                  height={400}
                  width={300}
                >
                  {bookmark.image && (
                    <Image
                      src={bookmark.image}
                      alt="Recipe"
                      borderTopRadius="lg"
                    />
                  )}
                  <Box p="6" width="100%">
                    <Stack spacing="3" width="100%">
                      <Heading size="md">{bookmark.title}</Heading>
                    </Stack>
                  </Box>
                  <Divider />
                  <Box p="6" width="100%">
                    <ButtonGroup spacing="2">
                      <Button
                        variant="solid"
                        colorScheme="blue"
                        onClick={() => handleClick(bookmark)}
                      >
                        View Details
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Card>
              </div>
            ))
          ) : (
            <p>No bookmarks found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Bookmarks;
