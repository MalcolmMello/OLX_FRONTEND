import React, { useEffect, useState } from "react";
import { PageArea } from './styled'
import useAPI from '../../helpers/OlxAPI'
import { doLogin } from '../../helpers/AuthHandler'
import {Name, Email, State, Container, Img} from './styled'

import { PageContainter, PageTitle } from '../../componentes/MainComponents'


const Page = () => {
    const api = useAPI()

    const[userLogged, setUserLogged] = useState([])

    useEffect(()=>{
        const getUser = async ()=> {
            const user = await api.getUser()
            setUserLogged(user)
            console.log(user)
        }
        getUser()
    }, [])

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
                    <button className="Button">Alterar dados</button>
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
        </PageContainter>
    )
}

export default Page