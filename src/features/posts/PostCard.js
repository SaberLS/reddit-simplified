import React from "react";
import { Card, CardBody, CardHeader, Box, Heading, Grid } from "grommet";
import { Ascending, Descending } from "grommet-icons";

export default function PostCard({ title, content }) {
    return (
        <Box align="center">
            <Card name="Post" direction="column" margin={{"top": "medium"}} height="large" width="large">
                <CardHeader direction="row" justify="between" pad="small" align="center">
                    <Grid columns={["full"]} rows={["1/2", "1/2"]} height="xsmall" width="xxsmall">
                        <Box justify="center" align="center">
                            <Ascending size="large" />
                        </Box>
                        <Box justify="center" align="center">
                            <Descending size="large" />
                        </Box>
                    </Grid>
                    <Box justify="start" align="start" fill="horizontal">
                        <Heading level="2">{title}</Heading>
                    </Box>
                </CardHeader>
                <CardBody pad="small">{ content }</CardBody>
            </Card>
        </Box>

    )
}