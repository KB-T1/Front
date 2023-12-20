import lamu from "../../assets/profilePicLamu.svg"
import algu from "../../assets/profilePicAlgu.svg"
import kiki from "../../assets/profilePicKiki.svg"
import coli from "../../assets/profilePicColi.svg"
import bibi from "../../assets/profilePicBibi.svg"
import styled from "styled-components"

interface SelectProfile {
    setProfile: (str: string) => void;
}

export function SelectProfile({setProfile}: SelectProfile) {
return <ProfileBox>
    <img src={lamu} alt="lamu" width={72} onClick={()=>{setProfile('lamu')}}/>
    <img src={kiki} alt="kiki" width={72} onClick={()=>{setProfile('kiki')}}/>
    <img src={coli} alt="coli" width={72} onClick={()=>{setProfile('coli')}}/>
    <img src={algu} alt="algu" width={72} onClick={()=>{setProfile('algu')}}/>
    <img src={bibi} alt="bibi" width={72} onClick={()=>{setProfile('bibi')}}/>
</ProfileBox>
}

const ProfileBox = styled.div`
    margin: 0 auto;
    width: 286px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    & > img {
        margin-right: 20px;
        margin-bottom: 20px;
    }
`