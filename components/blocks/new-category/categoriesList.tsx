import React, {useCallback, useState} from 'react';
import { Box, IconButton, TextField } from "@material-ui/core";
import { map } from "lodash";
import { MdEdit, MdDelete, MdClose, MdCheck } from 'react-icons/md';
import { useCategoriesContext } from "../../contexts/categories";

interface Category {
  category: {
    id: string;
    name: string;
  };
}

const HandleEdit: React.FC<Category> = ({ category }) => {
  const [newName, setNewName] = useState('');
  const [edit, setEdit] = useState(false);
  const { deleteCategory, updateCategory, loading, refetch } = useCategoriesContext();

  const handleDelete = useCallback(
    async id => {
      await deleteCategory({ variables: { id } });
      refetch();
    },
    [deleteCategory, refetch]);

  const handleUpdate = useCallback(
    async (id, name) => {
      await updateCategory({ variables: { id, name } });
      setEdit(false);
      refetch();
    },
    [updateCategory, refetch]);

  return (
    <Box
      p={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box p={2}>
        {edit ? (
          <TextField
            value={newName || category.name}
            onChange={(e) => setNewName(e.target.value)}
            variant="outlined"
            label="Name"
            disabled={loading}
          />
        ): (
          <h1>
            {category.name}
          </h1>
        )}
      </Box>
      <Box>
        {!edit ? (
          <>
            <IconButton onClick={() => setEdit(true)} disabled={loading}>
              <MdEdit />
            </IconButton>
            <IconButton onClick={() => handleDelete(category.id)} disabled={loading}>
              <MdDelete />
            </IconButton>
          </>
      ): (
        <>
          <IconButton onClick={() => handleUpdate(category.id, newName)} disabled={loading}>
            <MdCheck />
          </IconButton>
          <IconButton onClick={() => setEdit(false)} disabled={loading}>
            <MdClose />
          </IconButton>
        </>
      )}
      </Box>
    </Box>
  );
};

const CategoriesList = () => {
  const { categories } = useCategoriesContext();
  return (
    <Box>
      {map(categories, category => {
        return (
          <HandleEdit category={category} />
        );
      })}
    </Box>

  );
};

export default CategoriesList;
