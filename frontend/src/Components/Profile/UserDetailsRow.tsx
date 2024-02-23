import { Box, Text, IconButton, Input, useToast } from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { isInvalidEmail } from "../../Pages/SignUp";

type Props = {
  field: string;
  value: string;
  username: string;
};

const UserDetailsRow = ({ field, value, username }: Props) => {
  const [updateField, setUpdateField] = useState(false);
  const [valueState, setValueState] = useState(value);
  const toast = useToast();

  const onChange = (e: any) => {
    setValueState(e.target.value);
  };

  const onClickEdit = () => {
    setUpdateField(!updateField);
  };

  const onClickCheck = () => {
    if (field === "Email") {
        const invalidEmail = isInvalidEmail(valueState);
        if(invalidEmail) {
          toast({
            title: 'Error',
            description: `Please enter a valid email`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
        return;
    } else {
      if (valueState === ''){
        toast({
          title: 'Error',
          description: `Please enter a valid value!`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    const token = localStorage.getItem("token");

    // console.log("Token on check:", token)
    // console.log("username", username)

    setUpdateField(!updateField);

    axios.post(
      "http://localhost:4000/auth/change-account-detail",
      {
        username,
        field: field.toLowerCase(),
        value: valueState,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then ((response) => {
        console.log("RESPONSE:", response.data)
        toast({
          title: 'Success',
          description: `We have updated your account details`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
    }

    );
  };

  return (
    <Box display="flex" gap={2}>
      <Text flex={1} lineHeight="32px">
        {field}:
      </Text>
      {updateField ? (
        <Input flex={1} h="32px" value={valueState} onChange={onChange} type={field === "Password" ? "password" : "text"}/>
      ) : (
        <Text flex={1} lineHeight="32px">
          {field === "Password" ? "**********" : valueState}
        </Text>
      )}

      <IconButton
        aria-label="Edit name"
        icon={updateField ? <CheckIcon /> : <EditIcon />}
        size="sm"
        onClick={updateField ? onClickCheck : onClickEdit}
      />
    </Box>
  );
};

export default UserDetailsRow;
