import React from "react";
import { Card, CardBody, CardHeader, Box, Heading, Grid, } from "grommet";
import { Ascending, Descending } from "grommet-icons";

export default function PostCard({ title, content, redditLink, height }) {
    return (
        <Box align="center">
            <Card name="Post" direction="column" margin={{"top": "medium"}} height={height} width="large">
                <CardHeader direction="row" justify="between" pad="small" align="center">
                    <Grid  height="xsmall" width="xxsmall">
                        <Box justify="center" align="center">
                            <Ascending size="large" />
                        </Box>
                        <Box justify="center" align="center">
                            <Descending size="large" />
                        </Box>
                    </Grid>
                    <Box onClick={ () => window.open(`https://reddit.com${redditLink}`)} justify="start" align="start" fill="horizontal" overflow="auto">
                        <Heading style={{whiteSpace: 'nowrap'}} level="2">{title}</Heading>
                    </Box>
                </CardHeader>
                <CardBody pad="small">
                    { content }
                </CardBody>
            </Card>
        </Box>

    )
}