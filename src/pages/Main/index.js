import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';

import { Toaster, toast } from 'sonner'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa';

import api from '../../services/api';

export default function Main(){

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setrepositorios] = useState([]);
    const [loading,setLoading] = useState(false);

    // Buscar
    useEffect(()=> {
        const repoStorage = localStorage.getItem('repos');

        if(repoStorage){
            setrepositorios(JSON.parse(repoStorage));
        }
    }, []);

    // Salvar alterações
    useEffect(()=> {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setLoading(true);
            try{
                if(newRepo === ''){
                    toast.error('Você precisa indicar um repositório!');
                    throw new Error('Você precisa indicar um repositório!');
                }

                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositorios.find(repo => repo.name === newRepo);

                if(hasRepo){
                    toast.warning('O repositório digitado já foi adicionado!');
                    throw new Error('Repositório Duplicado');
                }

                const data = {
                    name: response.data.full_name,
                }
        
                setrepositorios([...repositorios, data]);
                toast.success('Repositório adicionado com sucesso!');
                setNewRepo('')               
            }catch(error){
                if (error.response && error.response.status === 404) {
                    toast.error('Repositório não encontrado!');
                } 
            }finally{
                setLoading(false);
            }
        }

        submit();

    }, [newRepo, repositorios]);

    function handleinputChange(e) {
        setNewRepo(e.target.value);
    }

    const handleDelete = useCallback((repo)=> {
        const find = repositorios.filter(r => r.name !== repo);
        setrepositorios(find);
        toast.success('Repositório apagado com sucesso!');

    }, [repositorios]);

    return(
        <>
            <Toaster 
            richColors
            toastOptions={{
                style: {
                    padding: 20,
                },
            }}/>
            <Container>
                <h1>
                    <FaGithub size={25}/>
                    Meus Repositórios
                </h1>

                <Form onSubmit={handleSubmit}>
                    <input 
                    type='text' 
                    placeholder='Adicionar Repositórios'
                    value={newRepo}
                    onChange={handleinputChange}
                    />

                    <SubmitButton loading={loading ? 1 : 0}>
                        { loading ? (
                            <FaSpinner color="#f1f3f5" size={14} />
                        ) : (
                            <FaPlus color='#f1f3f5' size={14} />    
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositorios.map(repo => (
                        <li key={repo.name}>
                            <span> {repo.name} </span>
                            <div>
                                <DeleteButton onClick={()=> handleDelete(repo.name)}>
                                        <FaTrash size={14}></FaTrash>
                                </DeleteButton>
                                <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                                    <FaBars size={20}/>
                                </Link>
                            </div>
                            
                        </li>
                    ))}
                </List>
            </Container>
        </>
    )
}