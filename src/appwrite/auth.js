import conf from "../config/conf";
import {Client,Account,ID} from "appwrite";

// we build this in class format so that it will be easy to migrate to another backend service provider
export class AuthService{
    client=new Client();
    Account

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURl)
        .setProject(conf.appwriteProjectId);

        this.account=new Account(this.client);
    }


    async createAccount({email,password,name}){

        try {
//dont expect object in .create 
          const userAccount= await this.account.create(
                ID.unique(),
                email,
                password,
                name 
            )
            
            if(userAccount){
                // call login here so that new acc directly get login 
              return   this.login(email,password)
            }else{
                return userAccount;
            }
        } catch (error) {
            throw  error
        }

    }
    
    async getCurrentUser(){
        try {
            return await this.account.get()
            
        } catch (error) {
             console.log("appwrite service :: getCurrentUser :: error",error);
        }

    }

    async login({email,password}){
        try {

        return await this.account.createEmailPasswordSession(email,password)
            
        } catch (error) {
           console.log("appwrite service :: login :: error",error);
        }

    }

    async logout (){
        try {
            return userAccount.deleteSessions();
            
        } catch (error) {
            console.log("appwrite service :: logout :: error",error);
            
        }
    }

    
};


const authService= new AuthService();

export default authService;