/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import JoinUs1 from "../../images/JoinUs1.png";
import JoinUs2 from "../../images/JoinUs2.png";
import JoinUsInfo from "./JoinUsInfo";
import { Box, Container } from "@mui/material";

const JoinUs = () => {
  return (
    <Box>
      <h1 className="heading">Our Programs</h1>
      <Container sx={{ width: "100%", height: "60vh", margin: "0 auto" }}>
        <section className="joinUs" css={styles}>
          <div className="wrap">
            <div className="img1">
              <JoinUsInfo
                title="Workout with our experts"
                info="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
              />
            </div>
          </div>
          <div className="wrap">
            <div className="img2">
              <JoinUsInfo
                title="Workout without trainer"
                info="There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration."
              />
            </div>
          </div>
        </section>
      </Container>
    </Box>
  );
};

// const styles = css`
//   width: 100%;
//   display: flex;

//   .wrap {
//     overflow: hidden;
//     width: 50%;
//     .img1 {
//       min-height: 50vh;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: all 0.8s;
//       background: url("${JoinUs1}") no-repeat center/cover;
//       &:hover {
//         transform: scale(1.2);
//       }
//     }
//   }
//   .wrap {
//     overflow: hidden;
//     width: 50%;
//     .img2 {
//       min-height: 50vh;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       transition: all 0.8s;
//       background: url("${JoinUs2}") no-repeat center/cover;
//       &:hover {
//         transform: scale(1.2);
//       }
//     }
//   }

//   @media (max-width: 990px) {
//     flex-direction: column;
//     .wrap {
//       width: 100%;
//     }
//   }
// `;

const styles = css`
  width: 100%;
  display: flex;
  justify-content: center;

  .heading {
    display: flex;
    justify-content: center;
    
    text-align: center;
  }

  .joinUs {
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .wrap {
    overflow: hidden;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img1,
  .img2 {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.8s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .img1 {
    background-image: url("${JoinUs1}");
    &:hover {
      transform: scale(1.2);
    }
  }

  .img2 {
    background-image: url("${JoinUs2}");
    &:hover {
      transform: scale(1.2);
    }
  }

  @media (max-width: 990px) {
    flex-direction: column;
    .wrap {
      width: 100%;
    }
  }
`;

export default JoinUs;
