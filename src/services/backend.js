export function getRedirectURI() {
  return fetch(process.env.API_URL + "spotify/authlink", {
    method: "GET",
  }).then((response) => response.json());
}

export function getUserToken(code) {
  return fetch(process.env.API_URL + "spotify/user/accesstoken/" + code, {
    method: "GET",
  }).then((response) => response.json());
}

export function getUserInfo(userAccessToken) {
  return fetch(process.env.API_URL + "spotify/user/info/" + userAccessToken, {
    method: "GET",
  }).then((response) => response.json());
}

export function getUserPlaylists(userAccessToken) {
  return fetch(
    process.env.API_URL + "spotify/user/playlists/" + userAccessToken,
    {
      method: "GET",
    }
  ).then((response) => response.json());
}

export function getSurveyByPlaylist(playlistId) {
  return fetch(process.env.API_URL + "survey/search/" + playlistId, {
    method: "GET",
  }).then((response) => response.json());
}

export function getSurveyById(id) {
  return fetch(process.env.API_URL + "survey/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function postSurvey(name, playlistId, userAccessToken, refreshToken) {
  const body = { name, playlistId, userAccessToken, refreshToken };
  return fetch(process.env.API_URL + "survey", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export function deleteSurvey(id) {
  return fetch(process.env.API_URL + "survey/" + id, {
    method: "DELETE",
  }).then((response) => response.json());
}

export function getTrackById(id) {
  return fetch(process.env.API_URL + "spotify/tracks/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function getPlaylistById(id) {
  return fetch(process.env.API_URL + "spotify/playlist/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function getPlaylistTracks(id) {
  return fetch(process.env.API_URL + "spotify/playlist/tracks/" + id, {
    method: "GET",
  }).then((response) => response.json());
}

export function putRankings(id, rankings) {
  const body = {
    pointsObjs: rankings,
  };

  return fetch(process.env.API_URL + "survey/" + id + "/rankings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export function getTopSurveys() {
  return fetch(process.env.API_URL + "survey/top", {
    method: "GET",
  }).then((response) => response.json());
}
