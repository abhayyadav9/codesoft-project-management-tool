import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

// Define custom styles using Material-UI's styled
const CustomBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '14rem',
  border: '1px solid black', // Set black border
  marginTop: '20px',

  borderRadius: '.5rem',
  display: 'flex',
  alignItems: 'center', // Align items to center
  marginLeft: '20px', // Add margin to the left
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  height: '2rem',
  background: 'white',
  borderRadius: '.5rem',
  '& .MuiInputBase-root': {
    borderRadius: '.5rem',
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
    padding: '0 1.6rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  transition: 'all .3s cubic-bezier(0, 0, 0.43, 1.49)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '5rem',
  height: '2rem',
  fontWeight: 'bold',
  background: '#4caf50',
  borderRadius: '0 .5rem .5rem 0',
  color: '#fff',
  transition: 'all .3s ease',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
  '&:disabled': {
    display: 'none',
  },
}));

const HiddenLabel = styled('label')(({ theme }) => ({
  position: 'absolute',
  clip: 'rect(1px, 1px, 1px, 1px)',
  padding: 0,
  border: 0,
  height: '1px',
  width: '1px',
  overflow: 'hidden',
}));

const SearchForm = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', inputValue);
  };

  return (
    <CustomBox component="form" onSubmit={handleSubmit} role="search">
      <HiddenLabel htmlFor="search">Search for stuff</HiddenLabel>
      <StyledTextField
        id="search"
        type="search"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
        autoFocus
        required
        variant="outlined"
      />
      {inputValue && (
        <StyledButton type="submit" disabled={!inputValue}>
          Search
        </StyledButton>
      )}
    </CustomBox>
  );
};

export default SearchForm;
