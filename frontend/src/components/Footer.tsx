import "../styles/Footer.scss";
import IReduxState from "../redux/ReduxState";

import { connect } from "react-redux";
const Footer = (props: any) => {
    const SwitchLanguage = (val: boolean) => {
        props.switchLanguage(val);
    };

    return (
        <div className="footer">
            <div className="language vi" onClick={() => SwitchLanguage(true)}>
                <div>
                    <i className='fa'>&#x56;&#x1D5C7;</i>
                </div>                
            </div>
            
            <div className="language en" onClick={() => SwitchLanguage(false)}>
                <div>
                    <i className='fa'>&#x45;&#x1D5C7;</i>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        switchLanguage: (data: boolean) => {
            dispatch({ type: "SWITCH_LANGUAGE", payload: data });
        }
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {
         language: state.language
    };    
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);