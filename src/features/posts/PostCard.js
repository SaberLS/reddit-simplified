import React from "react";
import { Card, CardBody, CardHeader, Box } from "grommet";

export default function PostCard({ title, content }) {
    return (
        <Box align="center">
            <Card name="Post" direction="column" justify="start" gap="none" margin={{"top": "medium"}} width="large">
                <CardHeader direction="row" justify="start" pad="small" align="start"  overflow="hidden">{ title }</CardHeader>
                <CardBody pad="large">{ content }</CardBody>
            </Card>
        </Box>

    )
}