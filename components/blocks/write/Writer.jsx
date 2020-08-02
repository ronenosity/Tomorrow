import React from 'react';
import styled from 'styled-components';
import Textarea from 'react-textarea-autosize';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DatePicker from 'react-datepicker';
import { scheme } from '../../../lib/theme';

const Writter = styled.div`
  grid-area: writter;
  border-right: 1px solid ${scheme.gray[4]};
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

const Title = styled.input`
  border: 0;
  outline: none;
  box-shadow: none;
  background-color: ${scheme.gray[1]};
  height: 60px;
  padding: 0px 40px;
  color: ${scheme.gray[8]};
  font-size: 2.4rem;
  font-weight: 700;
  margin: 20px 0;

  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;
const Text = styled.span`
  border: 0;
  outline: none;
  box-shadow: none;
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  font-size: 2.4rem;
  font-weight: 700;
  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const Container = styled.div`
  margin: 20px 35px;
  display: flex;
  flex-direction: column;
`;

// const DatePicker = styled.input`
//   box-shadow: none;
//   border: 1px solid ${scheme.gray[6]};
//   background-color: ${scheme.gray[1]};
//   color: ${scheme.gray[8]};
//   font-size: 1.5rem;
//   font-weight: 700;
//   width: 200px;
//   &::placeholder {
//     color: ${scheme.gray[5]};
//   }
// `;

const WritePaper = styled(Textarea)`
  font-size: 1.4rem;
  resize: none;
  outline: none;
  border: 0;
  background-color: ${scheme.gray[1]};
  color: ${scheme.gray[8]};
  padding: 0 40px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif;

  &::placeholder {
    color: ${scheme.gray[5]};
  }
`;

const StyledRadio = styled(Radio)`
  color: rgba(0, 0, 0, 0.54) !important;
`;

const Wrapper = ({ value, label, children }) => {
    const [checked, setIsChecked] = React.useState(false);
    const handleOnClick = React.useCallback((e) => {
        setIsChecked(e.target);
    }, [setIsChecked]);

    return (
      <Box display="row">
        <FormControlLabel
          value={value}
          control={<StyledRadio />}
          label={label}
          onClick={handleOnClick}
        />
        {checked ? (
          <>
            {children}
          </>
          ): null}

      </Box>
    );
};


function RadioButtonsGroup({ onChangeDate }) {
    const [value, setValue] = React.useState('');

    const handleChange = React.useCallback((event) => {
        setValue(event.target.value);
    }, [setValue]);

    const handleDate = React.useCallback((date) => {
        onChangeDate(String(date));
    }, [onChangeDate]);

    return (
      <FormControl>
        <FormLabel component="dataType">DataType</FormLabel>
        <RadioGroup name="DataType" value={value} onChange={handleChange}>
          <Wrapper value="year" label="Year">
            <DatePicker
              onChange={handleDate}
              showYearPicker
              dateFormat="yyyy"
            />
          </Wrapper>
          <Wrapper value="yearMonth" label="Year, Month" />
          <Wrapper value="yearMonthDay" label="Year, Month, Day" />
          <Wrapper value="AD" label="AD" />
          <Wrapper value="BC" label="BC" />
          <Wrapper value="era" label="Era" />
        </RadioGroup>
      </FormControl>
    );
}

const Writer = ({ onChangeDate, onChangeTitle, onChangeContent }) => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return (
    <Writter>
      <Container>
        <Text>Event Date</Text>
        <RadioButtonsGroup onChangeDate={onChangeDate} />
      </Container>
      <Title placeholder="What's up?" onChange={e => onChangeTitle(e.target.value)} />
      <WritePaper placeholder="Write down all your thoughts..." onChange={e => onChangeContent(e.target.value)} />
    </Writter>
  );
};

export default Writer;
