import { API } from "../../backend";

export const read = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${API}/users/` + params.userId, {
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

export const update = async (params, credentials, user) => {
  try {
    let response = await fetch(`${API}/users/` + params.userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + credentials.token,
      },
      body: user,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const list = async (signal) => {
  try {
    let response = await fetch(`${API}/users/`, {
      method: "GET",
      signal: signal,
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (params, credentials) => {
  try {
    let response = await fetch(`${API}/users/` + params.userId, {
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

export const follow = async (params, credentials, followId) => {
  console.log("PARAMSS", params.userId);
  console.log("CREDENTIALS", credentials.t);
  console.log("FOLLOW", followId);
  try {
    let response = await fetch(`${API}/users/follow/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ userId: params.userId, followId: followId }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const unfollow = async (params, credentials, unfollowId) => {
  try {
    let response = await fetch(`${API}/users/unfollow/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ userId: params.userId, unfollowId: unfollowId }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// export const findPeople = async (params, credentials, signal) => {
//   try {
//     let response = await fetch(`${API}/users/findpeople/` + params.userId, {
//       method: "GET",
//       signal: signal,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + credentials.token,
//       },
//     });
//     //console.log("FINDRESPONSE", response.json())
//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const findPeople = async (params, credentials, signal) => {
  try {
    let response = await fetch(`${API}/users/findpeople/` + params.userId, {
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
