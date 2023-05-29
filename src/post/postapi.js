import { API } from "../backend";

export const listByUser = async (params, credentials) => {
  // console.log("params", params);
  try {
    let response = await fetch(`${API}/posts/by/` + params.userId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const create = async (params, credentials, post) => {
  console.log("PARAMS", params);
  console.log("CREDENTIALS", credentials);
  console.log("PostS", post);
  try {
    let response = await fetch(`${API}/posts/new/` + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: post,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${API}/posts/feed/` + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const remove = async (params, credentials) => {
  try {
    let response = await fetch(`${API}/posts/` + params.postId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const like = async (params, credentials, postId) => {
  console.log("PARAMSLIKE", params);
  try {
    let response = await fetch(`${API}/posts/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const unlike = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${API}/posts/unlike`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
