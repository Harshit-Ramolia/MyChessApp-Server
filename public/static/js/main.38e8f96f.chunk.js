(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[1],{109:function(n,e,t){},129:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(14),c=t.n(i),o=(t(109),t(33)),s=t(13),u=t(160),l=t(172),j=t(3),d=Object(l.a)((function(n){return{fallback:{color:n.palette.secondary.main}}}));var b=function(){var n=d();return Object(j.jsx)("div",{children:Object(j.jsx)(u.a,{style:{position:"fixed",top:"50%",left:"50%"},className:n.fallback})})},O=t(26),v=t(162),f=t(163),h=t(164),m=t(165),g=t(166),x=t(175),p=t(87),y=t.n(p),k=t(91),S=t.n(k),w=t(89),I=t.n(w),G=t(90),q=t.n(G),F=t(88),$=t.n(F),U=Object(l.a)((function(n){return{root:{display:"flex"},drawer:{width:240,flexShrink:0,whiteSpace:"nowrap",zIndex:100},drawerPaper:{width:240,overflowX:"hidden",border:"none"},content:{flexGrow:1,padding:n.spacing(3)}}}));function Q(n){var e=n.open,t=n.setOpen,r=U(),i=function(){t(!1)},c=Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(v.a,{}),Object(j.jsx)("div",{children:Object(j.jsxs)(f.a,{children:[Object(j.jsx)(o.b,{to:"/",onClick:i,children:Object(j.jsxs)(h.a,{button:!0,children:[Object(j.jsx)(m.a,{children:Object(j.jsx)(y.a,{})}),Object(j.jsx)(g.a,{primary:"Home"})]})}),Object(j.jsx)(o.b,{to:"/game",onClick:i,children:Object(j.jsxs)(h.a,{button:!0,children:[Object(j.jsx)(m.a,{children:Object(j.jsx)($.a,{})}),Object(j.jsx)(g.a,{primary:"Game"})]})}),Object(j.jsx)(o.b,{to:"/playground",onClick:i,children:Object(j.jsxs)(h.a,{button:!0,children:[Object(j.jsx)(m.a,{children:Object(j.jsx)(I.a,{})}),Object(j.jsx)(g.a,{primary:"Playground"})]})}),Object(j.jsx)(o.b,{to:"/invitations",onClick:i,children:Object(j.jsxs)(h.a,{button:!0,children:[Object(j.jsx)(m.a,{children:Object(j.jsx)(q.a,{})}),Object(j.jsx)(g.a,{primary:"Invitations"})]})}),Object(j.jsx)(o.b,{to:"/history",onClick:i,children:Object(j.jsxs)(h.a,{button:!0,children:[Object(j.jsx)(m.a,{children:Object(j.jsx)(S.a,{})}),Object(j.jsx)(g.a,{primary:"History"})]})})]})})]});return Object(j.jsx)(x.a,{open:e,className:r.drawer,style:{zIndex:100},onClose:i,classes:{paper:r.drawerPaper},children:c})}var C=t(20),z=t(169),D=t(170),P=t(72),E=t(93),M=t.n(E),N=t(47),L=t.n(N),_=t(62),A=t(168),B=t(92),H=t(21),J=function(){var n=Object(H.m)(),e=Object(O.a)(n,2)[1];var t=function(){var n=Object(_.a)(L.a.mark((function n(t){var r,a,i;return L.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!("profileObj"in t)){n.next=5;break}return n.next=3,e({token:t.tokenId});case 3:a=n.sent,(null===(r=a.data)||void 0===r?void 0:r.login.errors)&&console.log(null===(i=a.data)||void 0===i?void 0:i.login.errors);case 5:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return Object(j.jsx)(B.GoogleLogin,{clientId:"343751366568-6gqpsmkdmb2d8oh0ghkkohhirgmrjge6.apps.googleusercontent.com",buttonText:"Login",onSuccess:t,cookiePolicy:"single_host_origin",render:function(n){return Object(j.jsx)(A.a,{onClick:n.onClick,disabled:n.disabled,variant:"outlined",color:"secondary",startIcon:Object(j.jsx)("img",{src:"icons/Google_'G'.png",style:{width:"18px"},alt:""}),children:"Login"})}})},R=function(){var n=Object(H.n)(),e=Object(O.a)(n,2)[1];return Object(j.jsx)(A.a,{onClick:Object(_.a)(L.a.mark((function n(){var t,r;return L.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e();case 2:r=n.sent,(null===(t=r.data)||void 0===t?void 0:t.logout)||console.log("Error");case 4:case"end":return n.stop()}}),n)}))),color:"secondary",children:"Logout"})},W=t(174),T=Object(l.a)((function(n){return{appBar:{zIndex:n.zIndex.drawer+1,color:n.palette.secondary.light,background:n.palette.primary.main},grow:{flexGrow:1},menuButton:{marginRight:n.spacing(2)},title:Object(C.a)({fontSize:"18px",fontWeight:800},n.breakpoints.up("sm"),{display:"block",fontSize:"22px"}),sectionDesktop:Object(C.a)({display:"none"},n.breakpoints.up("md"),{display:"flex"}),sectionMobile:Object(C.a)({display:"flex"},n.breakpoints.up("md"),{display:"none"})}}));function X(n){var e=n.setOpen,t=T(),r=Object(H.o)(),i=Object(O.a)(r,1)[0],c=i.data,s=null;return i.fetching||(s=(null===c||void 0===c?void 0:c.me)?Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(P.a,{children:c.me.username}),Object(j.jsx)(R,{})]}):Object(j.jsx)(J,{})),Object(j.jsx)("div",{className:t.grow,children:Object(j.jsx)(z.a,{position:"fixed",className:t.appBar,elevation:0,children:Object(j.jsxs)(v.a,{children:[Object(j.jsx)(D.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"open drawer",onClick:function(){e((function(n){return!n}))},children:Object(j.jsx)(M.a,{})}),Object(j.jsx)(o.b,{to:"/",children:Object(j.jsx)(P.a,{className:t.title,variant:"h6",noWrap:!0,children:"MYCHESSAPP"})}),Object(j.jsx)("div",{className:t.grow}),s,Object(j.jsx)(W.a,{smDown:!0,children:Object(j.jsx)("div",{style:{width:"100px"}})})]})})})}var Y=function(n){n.children;var e=Object(r.useState)(!1),t=Object(O.a)(e,2),i=t[0],c=t[1];return Object(j.jsxs)(a.a.Fragment,{children:[Object(j.jsx)(X,{setOpen:c}),Object(j.jsx)(Q,{open:i,setOpen:c})]})},K=a.a.lazy((function(){return t.e(9).then(t.bind(null,223))})),V=a.a.lazy((function(){return t.e(8).then(t.bind(null,224))})),Z=a.a.lazy((function(){return Promise.all([t.e(0),t.e(11)]).then(t.bind(null,230))})),nn=a.a.lazy((function(){return Promise.all([t.e(0),t.e(4),t.e(10)]).then(t.bind(null,228))})),en=a.a.lazy((function(){return t.e(5).then(t.bind(null,231))})),tn=a.a.lazy((function(){return Promise.all([t.e(0),t.e(6),t.e(7)]).then(t.bind(null,229))}));var rn=function(){return Object(j.jsx)(a.a.Fragment,{children:Object(j.jsxs)(o.a,{children:[Object(j.jsx)(Y,{}),Object(j.jsx)(r.Suspense,{fallback:b,children:Object(j.jsx)(K,{children:Object(j.jsxs)(s.d,{children:[Object(j.jsx)(s.b,{path:"/",exact:!0,children:Object(j.jsx)(V,{})}),Object(j.jsx)(s.b,{path:"/playground",exact:!0,children:Object(j.jsx)(Z,{})}),Object(j.jsx)(s.b,{path:"/game",exact:!0,children:Object(j.jsx)(nn,{})}),Object(j.jsx)(s.b,{path:"/invitations",exact:!0,children:Object(j.jsx)(en,{})}),Object(j.jsx)(s.b,{path:"/history",exact:!0,children:Object(j.jsx)(tn,{})}),Object(j.jsx)(s.a,{to:"/"})]})})})]})})};var an=function(){return Object(j.jsx)(a.a.Fragment,{children:Object(j.jsx)(rn,{})})},cn=t(96),on=t(71),sn=Object(cn.a)({palette:{primary:{main:"#1A1A1D",light:"#F9F9F9"},secondary:{main:"#E98074",light:"#fffff"},error:{main:on.a.A400}},spacing:10}),un=t(171),ln=t(15),jn=t(24),dn=t(94),bn=t(98);function On(n,e,t,r){return n.updateQuery(e,(function(n){return r(t,n)}))}var vn=new dn.SubscriptionClient("wss://chessharshit.herokuapp.com/graphql",{reconnect:!0}),fn=Object(jn.a)({url:"/graphql",fetchOptions:{credentials:"include"},exchanges:[jn.b,Object(jn.f)({forwardSubscription:function(n){return vn.request(n)}}),Object(bn.a)({updates:{Mutation:{login:function(n,e,t,r){On(t,{query:H.b},n,(function(n,e){return n.login.errors?e:{me:null===(t=n.login)||void 0===t?void 0:t.user};var t})),On(t,{query:H.a},n,(function(n,e){var t,r;return null==(null===(t=n.login)||void 0===t||null===(r=t.user)||void 0===r?void 0:r.gameStatus)?e:{GameStatus:n.login.user.gameStatus}})),t.invalidate("Query","invitationsOfUser"),t.invalidate("Query","historyGames"),t.invalidate("Query","currentGame")},logout:function(n,e,t,r){On(t,{query:H.b},n,(function(n,e){return n.logout?{me:null}:e})),On(t,{query:H.a},n,(function(n,e){return n.logout?{GameStatus:-1}:e})),t.invalidate("Query","invitationsOfUser"),t.invalidate("Query","historyGames"),t.invalidate("Query","currentGame")},invite:function(n,e,t,r){On(t,{query:H.a},n,(function(n,e){return n.invite.errors?e:{GameStatus:1}}))},acceptInvitation:function(n,e,t,r){On(t,{query:H.a},n,(function(n,e){return!1===n.acceptInvitation?e:{GameStatus:2}})),t.invalidate("Query","invitationsOfUser"),t.invalidate("Query","currentGame")},invalidateQuery:function(n,e,t,r){t.invalidate("Query","invitationsOfUser"),t.invalidate("Query","currentGame"),On(t,{query:H.a},n,(function(n,e){return"number"!==typeof n.invalidateQuery?e:{GameStatus:n.invalidateQuery}}))},endGame:function(n,e,t,r){On(t,{query:H.a},n,(function(n,e){return n.endGame?{GameStatus:0}:e}))},cancelInvitation:function(n,e,t,r){On(t,{query:H.a},n,(function(n,e){return n.cancelInvitation?{GameStatus:0}:e}))}}}}),jn.c]});c.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(ln.a,{value:fn,children:Object(j.jsx)(un.a,{theme:sn,children:Object(j.jsx)(an,{})})})}),document.getElementById("root"))},21:function(n,e,t){"use strict";t.d(e,"d",(function(){return q})),t.d(e,"c",(function(){return $})),t.d(e,"f",(function(){return Q})),t.d(e,"j",(function(){return z})),t.d(e,"l",(function(){return P})),t.d(e,"m",(function(){return M})),t.d(e,"n",(function(){return L})),t.d(e,"r",(function(){return A})),t.d(e,"b",(function(){return B})),t.d(e,"o",(function(){return H})),t.d(e,"e",(function(){return R})),t.d(e,"a",(function(){return W})),t.d(e,"h",(function(){return T})),t.d(e,"i",(function(){return Y})),t.d(e,"k",(function(){return V})),t.d(e,"g",(function(){return nn})),t.d(e,"p",(function(){return tn})),t.d(e,"q",(function(){return an}));var r,a,i,c,o,s,u,l,j,d,b,O,v,f,h,m,g,x,p=t(36),y=t(18),k=t(19),S=t(15),w=Object(k.a)(r||(r=Object(y.a)(["\n    fragment ErrorFragment on FieldError {\n  field\n  message\n}\n    "]))),I=Object(k.a)(a||(a=Object(y.a)(["\n    fragment UserFragment on UserClass {\n  _id\n  username\n  email\n  gameStatus\n}\n    "]))),G=Object(k.a)(i||(i=Object(y.a)(["\n    mutation CancelInvitation {\n  cancelInvitation\n}\n    "])));function q(){return S.b(G)}var F=Object(k.a)(c||(c=Object(y.a)(["\n    mutation AcceptInvitation($hostID: String!) {\n  acceptInvitation(hostID: $hostID)\n}\n    "])));function $(){return S.b(F)}var U=Object(k.a)(o||(o=Object(y.a)(["\n    mutation EndGame($chessID: String!) {\n  endGame(chessID: $chessID)\n}\n    "])));function Q(){return S.b(U)}var C=Object(k.a)(s||(s=Object(y.a)(["\n    mutation InvalidateQuery {\n  invalidateQuery\n}\n    "])));function z(){return S.b(C)}var D=Object(k.a)(u||(u=Object(y.a)(["\n    mutation Invite($email: String!) {\n  invite(email: $email) {\n    errors {\n      ...ErrorFragment\n    }\n  }\n}\n    ",""])),w);function P(){return S.b(D)}var E=Object(k.a)(l||(l=Object(y.a)(["\n    mutation Login($token: String!) {\n  login(token: $token) {\n    errors {\n      ...ErrorFragment\n    }\n    user {\n      ...UserFragment\n    }\n  }\n}\n    ","\n",""])),w,I);function M(){return S.b(E)}var N=Object(k.a)(j||(j=Object(y.a)(["\n    mutation Logout {\n  logout\n}\n    "])));function L(){return S.b(N)}var _=Object(k.a)(d||(d=Object(y.a)(["\n    mutation SaveMove($chessID: String!, $position: String!, $move: String!) {\n  saveMove(chessID: $chessID, position: $position, move: $move)\n}\n    "])));function A(){return S.b(_)}var B=Object(k.a)(b||(b=Object(y.a)(["\n    query Me {\n  me {\n    ...UserFragment\n  }\n}\n    ",""])),I);function H(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return S.c(Object(p.a)({query:B},n))}var J=Object(k.a)(O||(O=Object(y.a)(["\n    query CurrentGame {\n  currentGame {\n    _id\n    lastPosition\n    white {\n      ...UserFragment\n    }\n    black {\n      ...UserFragment\n    }\n  }\n}\n    ",""])),I);function R(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return S.c(Object(p.a)({query:J},n))}var W=Object(k.a)(v||(v=Object(y.a)(["\n    query GameStatus {\n  GameStatus\n}\n    "])));function T(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return S.c(Object(p.a)({query:W},n))}var X=Object(k.a)(f||(f=Object(y.a)(["\n    query History {\n  historyGames {\n    _id\n    isGameRunning\n    listOfPositions\n    white {\n      ...UserFragment\n    }\n    black {\n      ...UserFragment\n    }\n  }\n}\n    ",""])),I);function Y(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return S.c(Object(p.a)({query:X},n))}var K=Object(k.a)(h||(h=Object(y.a)(["\n    query Invitations {\n  invitationsOfUser {\n    host {\n      ...UserFragment\n    }\n    friend {\n      ...UserFragment\n    }\n  }\n}\n    ",""])),I);function V(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return S.c(Object(p.a)({query:K},n))}var Z=Object(k.a)(m||(m=Object(y.a)(["\n    subscription GameStarted($id: String!) {\n  gameStarted(id: $id)\n}\n    "])));function nn(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return S.d(Object(p.a)({query:Z},n),e)}var en=Object(k.a)(g||(g=Object(y.a)(["\n    subscription Move($id: String!) {\n  move(id: $id)\n}\n    "])));function tn(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return S.d(Object(p.a)({query:en},n),e)}var rn=Object(k.a)(x||(x=Object(y.a)(["\n    subscription NewInvitation($id: String!) {\n  newInvitation(id: $id) {\n    host {\n      ...UserFragment\n    }\n    friend {\n      ...UserFragment\n    }\n  }\n}\n    ",""])),I);function an(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return S.d(Object(p.a)({query:rn},n),e)}}},[[129,2,3]]]);
//# sourceMappingURL=main.38e8f96f.chunk.js.map