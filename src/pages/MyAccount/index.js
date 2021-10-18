import React, { useEffect, useState } from "react";
import { PageArea } from './styled'
import useAPI from '../../helpers/OlxAPI'
import { doLogin } from '../../helpers/AuthHandler'
import Cookies from "js-cookie";
import {
    Name,
    Email,
    State,
    Container,
    Img
} from './styled'
import Modal from "../../componentes/Modal";

import { PageContainter, PageTitle } from '../../componentes/MainComponents'


const Page = () => {
    const api = useAPI()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [stateLoc, setStateLoc] = useState('')
    const [rememberPassword, setRemeberPassword] = useState(false)
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [stateList, setStateList] = useState([])
    const [modalStatus, setModalStatus] = useState(false)
    const[userLogged, setUserLogged] = useState([])

    useEffect(()=>{
        const getUser = async ()=> {
            const user = await api.getUser()
            setUserLogged(user)
        }
        getUser()
    }, [])
    
    useEffect(()=>{
        const getStates = async () => {
            const sList = await api.getStates()
            setStateList(sList)
        }
        getStates()
    }, [])

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setDisabled(true)
        setError('')
        const json = await api.changeUser(name, email, stateLoc, password)

        if(json.error) {
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)
            window.location.href = '/'
        }

        setDisabled(false)
    }


    return (
        <PageContainter>
            <PageTitle>Minha Conta</PageTitle>
                <PageArea>
                    <Container>
                        <Name>
                            <p>Nome</p>
                            {userLogged.name}
                        </Name>
                        <Email>
                            <p>Email</p>
                            {userLogged.email}
                        </Email>
                        <State>
                            <p>Estado</p>
                            {userLogged.state}
                        </State>
                    </Container>
                    <button onClick={e=>setModalStatus(true)} className="Button">Alterar dados</button>
                </PageArea>
                <PageTitle>Seus Anúncios</PageTitle>
                <PageArea>
                    <Container>
                        {userLogged.ads &&
                            <div>
                                {userLogged.ads.map((i,k)=>
                                    <div className="aditens">
                                        <Img src={`http://alunos.b7web.com.br:501/media/${i.images.map((i,k)=>
                                        i.url    
                                        )}`
                                        }/>
                                        <div className="rightSide">
                                            <h1>{i.title}</h1>
                                            <p className="title">Descrição</p>
                                            <p>{i.description}</p>
                                            <p className="title">Categoria</p>
                                            <p>{i.category}</p>
                                            <p className="title">Preço</p>
                                            <p>R$ {i.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </Container>
                    <button className="Button">Alterar Dados dos Anúncios</button>
                </PageArea>
                <Modal status={modalStatus} setStatus={setModalStatus}>
                    <form onSubmit={handleSubmit}>
                        <label className="area">
                            <div className="area--title">Novo Nome</div>
                            <div className="area--input">
                                <input 
                                    type="text" 
                                    disabled={disabled}
                                    value={name}
                                    onChange={e=>setName(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Novo E-mail</div>
                            <div className="area--input">
                                <input 
                                    type="email" 
                                    disabled={disabled}
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Novo Estado</div>
                            <div className="area--input">
                                <select value={stateLoc} onChange={e=>setStateLoc(e.target.value)} required>
                                    <option></option>
                                    {stateList.map((i, k)=>
                                        <option key={k} value={i.name}>{i.name}</option>    
                                    )}
                                </select>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Nova Senha</div>
                            <div className="area--input">
                                <input 
                                type="password" 
                                disabled={disabled}
                                value={password}
                                onChange={e=>setPassword(e.target.value)}
                                required/>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled}>Mudar Dados</button>
                            </div>
                        </label>
                    </form>
                </Modal>
        </PageContainter>
    )
}

export default Page