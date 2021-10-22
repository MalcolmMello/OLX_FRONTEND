import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { PageArea } from './styled'
import useAPI from '../../helpers/OlxAPI'
import { doLogin } from '../../helpers/AuthHandler'
import {
    Name,
    Email,
    State,
    Container,
    Img
} from './styled'
import Modal from "../../componentes/Modal";
import ModalProdutos from "../../componentes/ModalProdutos";

import { PageContainter, PageTitle } from '../../componentes/MainComponents'


const Page = () => {
    const api = useAPI()
    const fileField = useRef();
    const history = useHistory();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [stateLoc, setStateLoc] = useState('')
    const [rememberPassword, setRemeberPassword] = useState(false)
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [stateList, setStateList] = useState([])
    const[userLogged, setUserLogged] = useState([])

    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [id, setId] = useState('')


    const [active, setActive] = useState(true)
    const [modalStatus, setModalStatus] = useState(false)
    const [modalProductsStatus, setModalProductsStatus] = useState(false)

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

    useEffect(()=>{
        const getCategories = async ()=> {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

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

    const handleSubmitProduct = async (e)=> {
        e.preventDefault();
        setDisabled(true);
        setError('');
        const pic = []
        for(let i=0;i<fileField.current.files.length;i++) {
            pic.push(fileField.current.files[i]);
        }

        const json = await api.changeAd(active, title, category, price, priceNegotiable, desc, pic, id);
        

        setDisabled(false);
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
                                            <p className="title">ID</p>
                                            <p>{i.id}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        }
                    </Container>
                    <button 
                        className="Button" 
                        onClick={e=>setModalProductsStatus(true)}
                    >
                        Alterar Dados dos Anúncios
                    </button>
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
                <ModalProdutos status={modalProductsStatus} setStatus={setModalProductsStatus}> 
                <form onSubmit={handleSubmitProduct}>
                        <label className="area">
                            <div className="area--title">Título</div>
                            <div className="area--input">
                                <input 
                                    type="text" 
                                    disabled={disabled}
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">
                                    <select
                                        value={category}
                                        onChange={e=>setCategory(e.target.value)}
                                        required                                    
                                    >
                                        <option></option>
                                        {categories.map((i, k)=>
                                            <option key={k} value={i._id}>{i.name}</option>
                                        )}
                                    </select>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Preço</div>
                            <div className="area--input">
                                <input 
                                    type="text"
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Preço Negociável</div>
                            <div className="area--input">
                                <input
                                    className="boxx"
                                    type="checkbox"
                                    disabled={disabled}
                                    checked={priceNegotiable}
                                    onChange={e=>setPriceNegotiable(!priceNegotiable)}
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Descrição</div>
                            <div className="area--input">
                                <textarea
                                    disabled={disabled}
                                    value={desc}
                                    onChange={e=>setDesc(e.target.value)}
                                ></textarea>
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">Imagens (1 ou mais)</div>
                            <div className="area--input">
                                <input
                                    type="file"
                                    disabled={disabled}
                                    ref={fileField}
                                    multiple
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title">ID do Produto</div>
                            <div className="area--input">
                                <input 
                                    type="text" 
                                    disabled={disabled}
                                    value={id}
                                    onChange={e=>setId(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button disabled={disabled} onClick={handleSubmitProduct}>Adicionar Anúncio</button>
                            </div>
                        </label>
                    </form>
                </ModalProdutos>
        </PageContainter>
    )
}

export default Page