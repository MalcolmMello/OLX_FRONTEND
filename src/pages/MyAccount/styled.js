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
    @media (max-width:600px) {
        button {
            width: 100%
        }
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
    .leftSide {
        display:flex;
        max-width:430px;
        flex-wrap: wrap;
        align-items: center;
        padding: 5px;
        border-radius: 5px;
        background-color: #eee
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
    @media (max-width:600px) {
        .leftSide {
            max-width: 50%;
            height: 50%;
        }
        .rightSide {
            h1 {
                font-size: 20px
            }
            p {
                font-size: 14px
            }
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
    width:200px;
    height:200px;
    border-radius:5px;
    margin: 5px;
    border: 1px solid #ccc;

    @media (max-width:600px) {
        width: 100px;
        height: 100px;;
    }
`

export const InputName = styled.input``
