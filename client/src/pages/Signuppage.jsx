import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signuppage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email +  " " + password + " " + username);
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error occurred during signup:", error);
      alert("An error occurred while signing up.");
    }
  }

  const handleLoginclick = () => {
    navigate('/');
  }

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400">Welcome To Our App</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
            <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="name" placeholder="Username" value= {username} onChange={(e) => setusername(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value= {password} onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                SignUp
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already a user?{" "}
        <Link color="teal.500" onClick={handleLoginclick}>
          Login
        </Link>
      </Box>
    </Flex>
  );
};

export default Signuppage;
