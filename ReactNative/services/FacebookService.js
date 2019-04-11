import React from 'react'
import FBSDK from 'react-native-fbsdk'

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager } = FBSDK

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager()
  }

  makeLoginButton(callback) {
    return (
      <LoginButton
        readPermissions={["public_profile", "email", "user_age_range", "user_gender", "user_photos"]}
        onLoginFinished={(error, result) => {
          if (error) {
            // console.log(error);
          } else if (result.isCancelled) {
            // console.log("canceled : " + error);
          } else {
            // console.log("<LoginButton>");
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                // console.log("AccessToken.getCurrentAccessToken");
                callback(data.accessToken)
              })
              .catch(error => {
                console.log(error)
              })
          }
        }} />
    )
  }

  makeLogoutButton(callback) {
    return (
      <LoginButton onLogoutFinished={() => {
        callback()
      }} />
    )
  }

  async fetchProfile(callback) {
    return new Promise((resolve, reject) => {
        // console.log("fetchProfile in promise");

        try {
            const request = new GraphRequest(
                '/me',
                null,
                (error, result) => {
                // console.log("fetchProfile in GraphRequest");

                if (result) {
                    const profile = result
                    profile.avatar = `https://graph.facebook.com/${result.id}/picture`
                    // console.log("fetchProfile resolve");
                    resolve(profile)
                } else {
                    // console.log("fetchProfile reject");
                    reject(error)
                }
                }
            )
            // console.log("fetchProfile (this.requestManager.addRequest(request).start())");
            // this.requestManager.addRequest(request).start()
            new GraphRequestManager().addRequest(request).start()
        } catch(e){
            console.error(e);
        }
    })
  }
}

export const facebookService = new FacebookService()