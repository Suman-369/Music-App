import { uploadFile, getPresignedUrl } from "../services/storage.service.js";

import musicModel from "../models/music.model.js";

import playlistModel from "../models/playList.model.js";

export async function uploadMusic(req, res) {
  const musicFile = req.files["music"][0];
  const coverImageFile = req.files["coverImage"][0];

  try {
    const musicKey = await uploadFile(musicFile);
    const coverImageKey = await uploadFile(coverImageFile);

    const music = new musicModel.create({
      title: req.body.title,
      artist: req.user.fullname.firstName + " " + req.user.fullname.lastName,
      artistId: req.user.id,
      musicKey,
      CoverImageKey: coverImageKey,
    });

    return res.status(201).json({
      message: "Music uploaded successfully",
      music,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error uploading music",
      error,
    });
  }
}

export async function getArtistMusic(req, res) {
  try {
    const musicList = await musicModel.find({ artistId: req.user.id }).lean();

    const musics = [];

    for (let music of musicList) {
      music.musicUrl = await getPresignedUrl(music.musicKey);
      music.coverImageUrl = await getPresignedUrl(music.CoverImageKey);
      musics.push(music);
    }
    return res.status(200).json({
      message: "Artist music fetched successfully",
      music: musics,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching artist music",
      error,
    });
  }
}

export async function createPlayList(req, res) {
  const { title, musics } = req.body;

  try {
    const playList = await playlistModel.create({
      title,
      artist: req.user.fullname.firstName + " " + req.user.fullname.lastName,
      artistId: req.user.id,
      musics,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Playlist created successfully",
      playList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating playlist",
      error,
    });
  }
}


export async function getArtistPlayList(req, res) {
  try {
    const playList = await playlistModel.find({ artistId: req.user.id })

    for (let list of playList) {
      for (let music of list.musics) {
        music.musicUrl = await getPresignedUrl(music.musicKey);
        music.coverImageUrl = await getPresignedUrl(music.CoverImageKey);
      }
    }

    return res.status(200).json({
      message: "Artist playlist fetched successfully",
      playList,
    });
  } catch (error) {

    return res.status(500).json({
      message: "Error fetching artist playlist",
      error,
    });
  }
}

export async function getAllMusics(req, res) {

  const {skip = 0, limit = 10} = req.query
  try {
    const musicList = await musicModel.find().lean().skip(parseInt(skip)).limit(parseInt(limit));

    const musics = [];
    for (let music of musicList) {
      music.musicUrl = await getPresignedUrl(music.musicKey);
      music.coverImageUrl = await getPresignedUrl(music.CoverImageKey);
      musics.push(music);
    }
    return res.status(200).json({
      message: "All music fetched successfully",
      music: musics,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching all music",
      error,
    });
  }
}


export async function getPlayListById(req, res) {
  const {id} = req.params

  try {
    const playList = await playlistModel.findById(id).lean()
    if(!playList){
      return res.status(404).json({
        message:"Playlist not found"
      })
    }
    for (let music of playList.musics) {
      music.musicUrl = await getPresignedUrl(music.musicKey);
      music.coverImageUrl = await getPresignedUrl(music.CoverImageKey);
    }
    return res.status(200).json({
      message: "Song fetched successfully",
      playList,
    });

  }
    catch (error) {
    return res.status(500).json({
      message: "Error fetching song",
      error,
    });
  }
}


export async function getMusicDetailsById(req, res) {
  const {id} = req.params
  try {
    const music = await musicModel.findById(id).lean()
    if(!music){
      return res.status(404).json({
        message:"Music not found"
      })
    }

    music.musicUrl = await getPresignedUrl(music.musicKey);
    music.coverImageUrl = await getPresignedUrl(music.CoverImageKey);
    return res.status(200).json({
      message: "Music details fetched successfully",
      music,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching music details",
      error,
    });
  }
}