/**
 * 友盟分享
 */
//var { NativeModules } = require('react-native');
import {NativeModules} from 'react-native'

const UMShare = NativeModules.UMShareModule;

//export default UMShare

export default  Share = {
  /**
   * text 为分享内容
   img 为图片地址，可以为链接，本地地址以及res图片（如果使用res,请使用如下写法：res/icon.png）
   url 为分享链接，可以为空
   title 为分享链接的标题
   platform为平台id，id对照表与授权相同
   callback中code为错误码，当为0时，标记成功。message为错误信息
      (code,message) =>{
            this.setState({result:message});
        }
   示例： ShareUtile.share(text,img,url,title,platform,(code,message) =>{
            this.setState({result:message});
        });
   * @param text
   * @param img
   * @param url
   * @param title
   * @param platform
   * @param callback
   * @returns {*|{height, borderRadius, borderWidth, borderColor, backgroundColor, paddingHorizontal, margin}}
   */
  share :(text, img, url, title,platform, callback) =>  UMShare.share(text, img, url, title, platform, callback),
  /**
   * 调起分享面板
   text 为分享内容
   img 为图片地址，可以为链接，本地地址以及res图片（如果使用res,请使用如下写法：res/icon.png）
   url 为分享链接，可以为空
   title 为分享链接的标题
   list 为分享平台数组，如：var list = [0,1,2]
   callback中code为错误码，当为0时，标记成功。message为错误信息
      (code,message) =>{
            this.setState({result:message});
        }
   示例：ShareUtile.shareboard(text,img,url,title,list,(code,message) =>{
            this.setState({result:message});
        });
   * @param text
   * @param img
   * @param url
   * @param title
   * //param list
   * @param callback
   * @returns {*}
   */
  shareboard: (text,img,url,title, callback) => UMShare.shareboard(text,img,url,title,[2,3], callback),
  /**
   * 其中code为错误码，当为0时标记为成功。其中message为错误信息。其中result属性如下：
               属性	含义
               uid	uid
               screen_name	用户名
               iconurl	头像
               accessToken	accessToken
               refreshToken	refreshToken
               gender	gender
               unionid	unionid
               openid	openid
               expires_in	过期时间
   示例：ShareUtile.auth(0,(code,result,message) =>{
            this.setState({result:message});
            if (code == 0){
                this.setState({result:result.uid});
            }
        });
   * @param id
   * @param completion
   * @returns {*|{screen}}
   */
  auth : (id,completion) => UMShare.auth(id,completion)

}
