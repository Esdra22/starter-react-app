import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider,   Container, Box, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Text, Textarea, TextTable,
  Thead,
  Table,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Select,
  Option,
  Image,
  TableContainer, Button} from '@chakra-ui/react'
  import { EditIcon, DeleteIcon} from '@chakra-ui/icons'

  import axios from 'axios'

// The default icon size is 1em (16px)


export default function App() {
  // 2. Wrap ChakraProvider at the root of your app
  const [input, setInput] = React.useState('s') // produto
    let [value, setValue] = React.useState('3') //preco
    const [selectedFile, setSelectedFile] = React.useState(null); // img
    let [text, setText] = React.useState('3e3') //descricao
    let [cat, setCat] = React.useState([]) //categorias
    let [prod, setProd] = React.useState([]) //produtos
    let [catText, setCatText] = React.useState([]) //descricao
    let [atualizar, setAtualizar] = React.useState(false) //descricao
    let [id, setId] = React.useState('') //descricao

    
  const update = async (id)=>{
    setAtualizar(true)
    const{data}=  await axios.get('https://frightened-cyan-overalls.cyclic.app/produto/'+id)
    setInput(data.nome_produto)
    setValue(data.preco_produto)
    setText(data.descricao_produto)

    setId(id)
    
    
   }

   const updateValue = async ()=>{
    if(!id) return
    await axios.put('https://frightened-cyan-overalls.cyclic.app/produto/'+ id,{nome_produto:input,preco_produto:value,descricao_produto:text})
    AXIOS()
    setAtualizar(false)
    setId('')
    setValue('')
    setInput('')
    setText('')
   }

  let handleInputChangeText = (e) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  async function AXIOS(){
    const res = await axios.get('https://frightened-cyan-overalls.cyclic.app/')
    setCat(res.data.categorias)
    setProd(res.data.produtos)
    console.log(res);
  }
  React.useEffect(()=>{

   
    AXIOS()
  },[])

  const handleInputChange = (e) => setInput(e.target.value)
  const handleInputChangeT = (e) => setText(e.target.value)

  const isErrorP = input === ''
  const isErrorPr = value === ''
  const isErrorTx = text === ''

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const insert = async ()=>{

    var up = new FormData();
    up.append('nome_produto',input)
    up.append('preco_produto',value)
    up.append('foto_produto', selectedFile)
    up.append('descricao_produto',text)
    up.append('categoria_idcategoria',catText)

    const res = await axios.post('https://frightened-cyan-overalls.cyclic.app/insert',up,{
      headers:{'Content-Type': 'multipart/form-data'}
    });

    alert(res.data.title)
    AXIOS()
    setValue('')

    setInput('')
    
    setText('')
  }



  return (
    <ChakraProvider>
      <Container maxW='5xl' bg='#fafafa' boxShadow='xl' mt={10}>
        <Box  w='100%' p={4} color='#000'>
              <FormLabel>Imagem</FormLabel>
              <Input type='file'  onChange={handleFileSelect} />

            <FormControl isInvalid={isErrorP} marginTop='10'>
              <FormLabel>Nome do produto</FormLabel>
              <Input type='text' value={input} onChange={handleInputChange} />
              {!isErrorP ? (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              ) : (
                <FormErrorMessage>campo obrigatorio.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isErrorP} marginTop='10'>
              <FormLabel>Categoria</FormLabel>
              <Select placeholder='Selecione a categoria' onChange={(e)=>setCatText(e.target.value)}>
               { cat.map((el) => <option key={el.idcategoria} value={el.idcategoria}>{el.nome_categoria}</option>)}
              </Select>
            </FormControl>
            <FormControl isInvalid={isErrorPr} marginTop='10'>
              <FormLabel>Preço do produto</FormLabel>
              <Input type='text' value={value} onChange={handleInputChangeText} />
              {!isErrorPr ? (
                <FormHelperText>
            
                </FormHelperText>
              ) : (
                <FormErrorMessage>campo obrigatorio.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={isErrorTx} marginTop='10'>
            <Text mb='8px'>Descrição</Text>
            <Textarea
              value={text}
              onChange={handleInputChangeT}
              placeholder='produto'
              size='sm'
            />
            {!isErrorTx ? (
                <FormHelperText>
                 
                </FormHelperText>
              ) : (
                <FormErrorMessage>campo obrigatorio.</FormErrorMessage>
              )}
              </FormControl>
            <br/>
            <Button onClick={atualizar ? updateValue : insert} bg='#D8A902' color='#666' mt={5}>{atualizar ? 'Actualizar' : 'Cadastrar'}</Button>
        </Box>
        <Box w='100%' p={4} color='white'>
        <TableContainer>
            <Table variant='simple'>
             
              <Thead bg='#D8A902' color='white'>
                <Tr >
                  <Th>Id</Th>
                  <Th>Imagem</Th>
                  <Th>Nome do produto</Th>
                  <Th>Preço</Th>
                  <Th>Acção</Th>
                </Tr>
              </Thead>
              <Tbody color='#000'>
              { prod.map((el) => 
                <Tr key={el.idprodutos}>
                  <Td>{el.idprodutos}</Td>
                  <Td><Image width={50} height={50} rounded='100%' src={'https://frightened-cyan-overalls.cyclic.app/images/' + el.foto_produto}/></Td>
                  <Td >{el.nome_produto}</Td>
                  <Td>{el.preco_produto}</Td>
                  <Td ><IconButton
                        colorScheme='red'
                        aria-label='Call Segun'
                        size='sm'
                        icon={<DeleteIcon />}
                        onClick={() =>{setProd(prod.filter(v => v.idprodutos != el.idprodutos));axios.delete('https://frightened-cyan-overalls.cyclic.app/produto/'+el.idprodutos)}}
                      />
                       <IconButton
                       ml={1}
                                colorScheme='teal'
                                aria-label='Call Segun'
                                size='sm'
                                icon={<EditIcon />}
                                onClick={ () => update(el.idprodutos)}
                        />
                      
                      </Td>
                </Tr>
                )}
              
              </Tbody>
              
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </ChakraProvider>
  )
}
