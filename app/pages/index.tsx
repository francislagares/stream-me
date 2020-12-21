import { Container, Typography, Box, Button } from '@material-ui/core';
import Link from 'next/link';

const IndexPage = (): JSX.Element => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/streams">
          <Button variant="contained" color="primary">
            Go to the streams page
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default IndexPage;
