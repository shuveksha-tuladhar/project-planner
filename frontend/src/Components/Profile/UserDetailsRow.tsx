import { Box, Text, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  field: string;
  value: string;
};
const UserDetailsRow = ({field, value}: Props) => {
  return (
    <Box display="flex">
      <Text flex={1} lineHeight="32px">
        {field}: 
      </Text>
      <Text flex={1} lineHeight="32px">
        {value}
      </Text>
      <IconButton aria-label="Edit name" icon={<EditIcon />} size="sm" />
    </Box>
  );
};

export default UserDetailsRow;
