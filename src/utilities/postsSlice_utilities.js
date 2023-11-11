export const checkType = (child) => {
    if(child.is_gallery){
        console.log("gallery: ", child);
        return 'gallery';
    }else if(child.is_video){
        return 'hosted:video';
    }else if(child.post_hint){
        return child.post_hint;
    }
    console.log(child);
    return 'dunno';
}

export const makeGallery = (items) => {
    return items.map(item => {//https://i.redd.it/k8bsw0zzeizb1.jpg
        return `https://i.redd.it/${item.media_id}.jpg`;
    })
}