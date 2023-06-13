/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Container from "../Global/Container";
import Heading from "../Global/Heading/Heading";
import FeaturesCard from "../Features/FeaturesCard";
import Features1 from "../../images/features1.svg";
import Features2 from "../../images/features2.svg";
import Features3 from "../../images/features3.svg";
import Features4 from "../../images/features4.svg";
import { Card } from '@mui/material';

const Features = () => {
    return (
        <Container>
            <Card>fe</Card>
        </Container>
        // <section className="features" css={styles}>
        //     <Container>
        //         <Heading title="OUR PROGRAMS" info="We Offer you wide choices of programs" />
        //         <div className="featureWrapper">
        //             <FeaturesCard featureImg={Features1} featureHeading="Workout with Our Experts" featureInfo="Interact with our experts one on one and get Full support" />
        //             <FeaturesCard featureImg={Features2} featureHeading="Workout without trainer" featureInfo=" " />
        //             <FeaturesCard featureImg={Features3} featureHeading="Flex Your Muscles" featureInfo="There are many variations of passages of lorem Ipsum available." />
        //             <FeaturesCard featureImg={Features4} featureHeading="Cardio Exercises" featureInfo="There are many variations of passages of lorem Ipsum available." />
        //         </div>
        //     </Container>
        // </section>
    )
}

const styles = css`
    width: 100%;
    background: #000;
    .container {
        padding: 150px 0;
        max-width: 1200px;
        .featureWrapper {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 100%;
            padding: 80px 0 0 0;
        }
    }

    @media(max-width: 594px) {
        .container {
            .featureWrapper {
                display: flex;
                justify-content: center;
                margin: 0 auto;
                .featureCard {
                    margin: 40px 0 0 0;
                }
            }
        }
    }
`;

export default Features;