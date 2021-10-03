import React, { useState } from "react";
import { PageArea } from './styled'
import useAPI from '../../helpers/OlxAPI'
import { doLogin } from '../../helpers/AuthHandler'

import { PageContainter, PageTitle, ErrorMessage } from '../../componentes/MainComponents'


const Page = () => {
    const api = useAPI()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRemeberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setDisabled(true)

        const json = await api.login(email, password)

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
            <PageTitle>Login</PageTitle>
            <PageArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">E-mail</div>
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
                        <div className="area--title">Senha</div>
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
                        <div className="area--title">Lembrar Senha?</div>
                        <div className="area--input">
                            <input 
                                type="checkbox" 
                                className='boxx' 
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={()=>setRemeberPassword(!rememberPassword)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disabled}>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainter>
    )
}

export default Page