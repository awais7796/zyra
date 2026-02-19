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
            }else{
                return userAccount;
            }


        } catch (error) {
            throw  error
        }

    }

    async login({email,password}){

    }
};


const authService= new AuthService();

export default authService;