const jwt = require('jsonwebtoken')
var client = require('./connection')

module.exports = {
    async getAllUsers() {
        let result
        try {
            console.log("Getting all users")
            result = await client.query("SELECT pk_utilisateur_id,  nom, isadmin, isban FROM utilisateur")
        } catch(e) {
            console.log(e)
        } finally {
            return result
        }
    },    

    async getOnebyUserName(userName) {
        let result
        try {
            console.log("Getting user details by UserName")
            result = await client.query("SELECT * FROM utilisateur WHERE nom = ($1)", [userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async addUserToDatabase(userName, password) {
        size = await this.getAllUsers()
        try {
            console.log("Add user to Database")
            result = await client.query("INSERT INTO utilisateur (nom, pass, isadmin, token, isban) VALUES ( ($1), ($2), ($3), ($4), ($5) )", [userName, password, false, null, false])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async getPasswordFromUser(userName) {        
        try {
            console.log("Get Password from UserName")
            result = await client.query("SELECT pass FROM utilisateur WHERE nom = ($1)", [userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async getIdFromUserName(userName) {        
        try {
            console.log("Get ID from UserName")
            result = await client.query("SELECT pk_utilisateur_id FROM utilisateur WHERE nom = ($1)", [userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async addTokenToUser(token) {        
        try {            
            const user = jwt.verify(token, 'blablasecret')            
            result = await client.query("UPDATE utilisateur SET token = ($1) WHERE nom = ($2)", [token, user.userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async getUserIsAdmin(userName) {        
        try {
            console.log("Getting value isAdmin")                  
            result = await client.query("SELECT isadmin FROM utilisateur WHERE nom = ($1)", [userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async findToken(token) {        
        try {
            console.log("Find if token is present in database")                  
            result = await client.query("SELECT token FROM utilisateur WHERE token = ($1)", [token])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async getUserBan(userName) {        
        try {
            console.log("Find if user is ban")                  
            result = await client.query("SELECT isban FROM utilisateur WHERE nom = ($1)", [userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async banUser(userName) {        
        try {
            console.log("Ban a User : " + userName)                  
            result = await client.query("UPDATE utilisateur SET isban = ($1) WHERE nom = ($2)", [true, userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async unBanUser(userName) {        
        try {
            console.log("UnBan a User")                  
            result = await client.query("UPDATE utilisateur SET isban = ($1) WHERE nom = ($2)", [false, userName])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async deleteUser(pkIdUser) {        
        try {
            console.log("Delete a User")
            await client.query("DELETE FROM task WHERE fk_utilisateur_id = ($1)", [pkIdUser])                  
            result = await client.query("DELETE FROM utilisateur WHERE pk_utilisateur_id = ($1)", [pkIdUser])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    },

    async editUser(userName, pkIdUser) {
        try {
            console.log("Edit a User")                  
            result = await client.query("UPDATE utilisateur SET nom = ($1) WHERE pk_utilisateur_id = ($2)", [userName, pkIdUser])            
        } catch(e) {
            console.log(e)
        } finally {            
            return result
        }
    }


}
