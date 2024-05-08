import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';

function App() {

  const [textFieldContents, setTextFieldContents] = useState("");

  const [wordsArray, setWordsArray] = useState([]);

  const [responseData, setResponseData] = useState([]);

  const words = wordsArray.map(word =>
    <Button variant="text" onClick={() => { lookupWord(word) }} >{word}</Button>
  )

  const definitions = responseData.map(item =>
    <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      {item.full_name}
    </AccordionSummary>
    <AccordionDetails>
      <p>
      Type: {item.intern_type}
      </p>
      <p>
      Definition: {item.translations_unstructured.en}
      </p>
    </AccordionDetails>
  </Accordion>
  )

  function buttonClicked() {
    // Split by space. Remember to remove punctuation
    setWordsArray(textFieldContents.replace(/[,.;:'"]+/g, "").split(" "));
  }

  async function lookupWord(word) {
    var url = new URL("https://corsproxy.io/?https://www.latin-is-simple.com/api/vocabulary/search/?query=" + word + "&forms_only=true")
    // Call the API
    axios.get(url).then(function (response) {
      // handle success
      setResponseData(response.data);
    })
    console.log(responseData)
  }

  return (
    <>
      <Stack spacing={2} direction="row">
        <TextField id="outlined-basic" label="Text" variant="outlined" value={textFieldContents} onChange={(event) => { setTextFieldContents(event.target.value) }} />
        <Button variant="contained" onClick={buttonClicked}>Submit</Button>
      </Stack>
      {words}
      {definitions}
    </>
  )
}

export default App;
