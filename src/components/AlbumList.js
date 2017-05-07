import React, {Component} from "react";
import {connect} from "react-redux"
import * as _ from "lodash"

import Album from "./Album"

import LoadingIndicator from "./LoadingIndicator"

import itunesLogo from "../img/itunes.jpg";
import spotifyLogo from "../img/spotify.svg";

class AlbumList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mergedAlbums: this.toMergedAlbums(props.itunesItems, props.spotifyItems)
        }
    }

    toMergedAlbums(itunesItems, spotifyItems) {
        const itunesItemDic = _.keyBy(itunesItems, x => x.collectionName);
        const spotifyItemDic = _.keyBy(spotifyItems, x => x.name);

        const allItemKeys = _.union(_.keys(itunesItemDic), _.keys(spotifyItemDic));

        const mergedAlbums = allItemKeys.map(itemKey => {
            const res = {};
            if (itunesItemDic[itemKey]) {
                const item = itunesItemDic[itemKey];
                res.itunesItem = item;
                res.title = item.collectionName;
                res.img = item.artworkUrl100;
            }
            if (spotifyItemDic[itemKey]) {
                const item = spotifyItemDic[itemKey];
                res.spotifyItem = item;
                res.title = item.name;
                const findedImage = item.images.find(x => x.height === 300);
                res.img = findedImage ? findedImage.url : null;
            }
            return res;
        });

        return _.sortBy(mergedAlbums, x => x.itunesItem && x.spotifyItem);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.itunesItems !== this.props.itunesItems || nextProps.spotifyItems !== this.props.spotifyItems) {
            this.setState({mergedAlbums: this.toMergedAlbums(nextProps.itunesItems, nextProps.spotifyItems)})
        }
    }

    render() {
        return (
            <div style={this.props.style}>
                <LoadingIndicator loading={this.props.loading}/>
                {
                    this.state.mergedAlbums.map((item, i) =>
                        <Album key={i} title={item.title} imgSrc={item.img}
                               buttons={[{
                                   visible: !!item.itunesItem,
                                   href: item.itunesItem ? item.itunesItem.collectionViewUrl : "",
                                   img: <img src={itunesLogo} alt="iTunes"/>
                               }, {
                                   visible: !!item.spotifyItem,
                                   href: item.spotifyItem ? item.spotifyItem.external_urls.spotify : "",
                                   img: <img src={spotifyLogo} alt="Spotify"/>
                               },]}/>
                    )
                }
            </div>
        );
    }
}


export default connect(({itunesItems, spotifyItems}) => {
    const {items: itunesItemsData, loading: itunesLoading} = itunesItems;
    const {items: spotifyItemsData, loading: spotifyLoading} = spotifyItems;
    return {
        itunesItems: itunesItemsData,
        spotifyItems: spotifyItemsData,
        loading: (itunesLoading && spotifyLoading)
    }
})(AlbumList);
