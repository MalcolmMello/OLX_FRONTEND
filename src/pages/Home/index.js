import React, { useState, useEffect } from "react";
import { SearchArea, PageArea } from './styled'
import useAPI from '../../helpers/OlxAPI'

import { PageContainter } from '../../componentes/MainComponents'
import AdItem from '../../componentes/partials/AdItem'
import { Link } from "react-router-dom";


const Page = () => {
    const api = useAPI();

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] =useState([])

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(()=>{
        const getRecentAds = async () => {
            const json = await api.getAds({
                sor:'desc',
                limit:3
            });
            setAdList(json.ads)
        }
        getRecentAds();
    }, []);

    return (
        <>
        <SearchArea>
            <PageContainter>
                <div className="searchBox">
                    <form method="GET" action="/ads">
                        <input type="text" name="q" placeholder="O que você procura" />
                        <select name="state">
                            {stateList.map((i,k)=>
                                <option key={k} value={i.name}>{i.name}</option>    
                            )}
                        </select>
                        <button>Pesquisar</button>
                    </form>
                </div>
                <div className="categoryList">
                    {categories.map((i,k)=>
                        <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                            <img src={i.img} alt="" />
                            <span>{i.name}</span>
                        </Link>
                    )}
                </div>
            </PageContainter>
        </SearchArea>
        <PageContainter>
            <PageArea>
                <h2>Anúncios Recentes</h2>
                <div className='list'>
                    {adList.map((i,k)=>
                        <AdItem key={k} data={i} />
                    )}
                </div>
                <Link to="/ads" className="seeAllLink">Ver Todos</Link>

                <hr />

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisi justo, malesuada vel mauris eget, dignissim laoreet tortor. Integer quis mauris ut mauris facilisis tristique. Donec posuere volutpat dui quis tincidunt. Cras quis justo ante. Proin molestie venenatis ipsum, id ultrices arcu porta nec. 
            </PageArea>
        </PageContainter>
        </>
    )
}

export default Page