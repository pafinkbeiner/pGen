import { Box, LinearProgress, TextField } from "@mui/material"
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify'
import './App.css';
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from './characters'


function App() {

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")

  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const handleGeneratePassword = (e) => {

    setLoading(true)

    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify('You must Select atleast one option', true)
    }
    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }

    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumbers) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + specialCharacters
    }

    setTimeout(() => {
      setLoading(false)
      setPassword(createPassword(characterList))
    }, 1000)

  }

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }


  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true)
    } else {
      copyToClipboard()
      notify("Successfull copied")
    }
  }

  useEffect(() => {
    generatePassword()
  }, [])

  const generatePassword = () => {


    setPassword(password)

  }

  return (
    <div className="App">
      <div className="background" style={{ display: "flex", flexDirection: "column", height: "100vh", color: "white" }}>

        <div style={{ backgroundColor: "rgba(155,155,155,0.1)", height: "5%", display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "1rem" }}><p style={{ fontSize: "1.3em" }}>pGen - Password Generator</p></div>

        {loading ? <Box sx={{ width: '100%' }}><LinearProgress color="inherit" /></Box>: <Box sx={{ width: '100%', height: "4px"}}></Box>}

        <div style={{ backgroundColor: "rgba(10,10,10,0.1)", height: "90%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem" }}>

          <div style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <input type="text" placeholder="Password.." style={{ width: "90%" }} value={password} readOnly={true}></input>
            <div onClick={handleGeneratePassword} className="btn" style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "center" }}><RefreshRounded></RefreshRounded></div>
          </div>
          {/* <div><ArrowDownwardRounded></ArrowDownwardRounded></div> */}

        </div>

        <div style={{ backgroundColor: "rgba(155,155,155,0.1)", height: "5%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "1rem" }}>	&copy; Paul Finkbeiner 2022</div>

      </div>
    </div>
  );
}

export default App;
