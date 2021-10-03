import React from "react";
import { PageArea } from './styled'

import { PageContainter, PageTitle } from '../../componentes/MainComponents'


const Page = () => {

    return (
        <PageContainter>
            <PageTitle>Login</PageTitle>
            <PageArea>
                <form>
                    <label className="area">
                        <div className="area--title">E-mail</div>
                        <div className="area--input">
                            <input type="email" />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Senha</div>
                        <div className="area--input">
                            <input type="password" />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Lembrar Senha?</div>
                        <div className="area--input">
                            <input type="checkbox" className='boxx'/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button>Fazer Login</button>
                        </div>
                    </label>
                </form>
            </PageArea>
        </PageContainter>
    )
}

export default Page