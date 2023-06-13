/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Container from "../Global/Container";
import Button1 from "../Global/Button/Button";
import {Button } from "@mui/material"
// Background Image
import SaleBg from "../../images/Sale.png";
import { useNavigate } from 'react-router-dom';

const Sale = () => {
    const navigate= useNavigate()
    const handleClick = () =>{
        navigate("/food")
    }
    return (
        <section className="saleSection" css={styles}>
            <Container>
                <div className="wrapper">
                    <h2>Eat Your Protein</h2>
                    <h3>50% Off</h3>
                    <h3>Track your Calories,Nutrients and Micros according to your Goals.</h3>
                    <p>Calucalate the amount of calorie you need to achieve your goals</p>
                    <Button sx={{padding:"20px",color:"white",bgcolor:"red"}} onClick={handleClick}>Calculate</Button>
                </div>
            </Container>
        </section>
    )
}

const styles = css`
    width: 100%;
    background: url('${SaleBg}') no-repeat center/cover;
    .container {
        padding: 200px 0;
        display: flex;
        max-width: 1200px;
        justify-content: flex-end;
        .wrapper {
            h3 {
                color: #fff;
                font-size: 2.6rem;
            }
            h2 {
                color: rgb(255, 20, 20);
                font-size: 6rem;
            }
            p {
                padding: 10px 0 40px 0;
                max-width: 500px;
                color: #fff;
            }
        }
    }
`;

export default Sale;