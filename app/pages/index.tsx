import { Container, Typography, Box } from '@material-ui/core';

const IndexPage = (): JSX.Element => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
      </Box>
    </Container>
  );
};

export default IndexPage;
