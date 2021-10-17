import styled from 'styled-components'

export const PageArea = styled.div`
    margin-bottom:20px;
    button {
        margin-top:10px;
        border:0;
        background:none;
        color:#000;
        font-size:14px;
        text-decoration:none;
        cursor:pointer;
        outline: 0; 
        background-color:#FF8100;
        border-radius:4px;
        color:#FFF;
        padding:5px 10px;
    }
    button:hover {
        background-color:#E57706
    }
`

export const Container = styled.div`
    display:flex;
    flex-direction:column; 
    padding:10px;
    background-color: #FFF;
    border-radius:5px;
    border:1px solid #999;

    .aditens {
        display:flex;
        margin-bottom: 20px;
        padding:20px 0px;
        border-bottom:1px solid #bbb
    }
    .rightSide {
        display:flex;
        flex-direction:column;
        margin-left:30px;

        .title {
            margin:0;
            font-weight:bold
        }
    }
`

export const Name = styled.div`
    p {
        font-weight:bold
    }
`

export const State = styled.div`
    p {
        font-weight:bold
    }
`

export const Email = styled.div`
    p {
        font-weight:bold
    }
`

export const Img = styled.img`
    width:300px;
    height:300px;
    border-radius:5px
`
