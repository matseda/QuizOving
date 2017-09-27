package services;

import java.util.ArrayList;

/**
 * Created by medavidsen on 19.09.2017.
 */
public class Spm {
    private String tekst;
    private String alt1;
    private String alt2;
    private String alt3;
    private String alt4;
    private int riktig;
    private int tid;

    public Spm(){

    }
    public Spm(String tekst, String alt1, String alt2, String alt3, String alt4, int riktig, int tid){
        this.tekst=tekst;
        this.alt1=alt1;
        this.alt2=alt2;
        this.alt3=alt3;
        this.alt4=alt4;
        this.riktig=riktig;
        this.tid=tid;
    }

    public void setTekst(String tekst) {
        this.tekst = tekst;
    }

    public String getTekst(){
        return tekst;

    }


    public int getRiktig(){
        return riktig;
    }

    public int getTid(){
        return tid;
    }

    public String getAlt1() {
        return alt1;
    }

    public void setAlt1(String alt) {
        this.alt1 = alt;
    }

    public String getAlt2() {
        return alt2;
    }

    public void setAlt2(String alt) {
        this.alt2 = alt;
    }

    public String getAlt3() {
        return alt3;
    }

    public void setAlt3(String alt) {
        this.alt3 = alt;
    }

    public String getAlt4() {
        return alt4;
    }

    public void setAlt4(String alt) {
        this.alt4 = alt;
    }

    public boolean addFasit(int tall){
        if(tall>0 && tall<5){
        riktig=tall;

        return true;
    }
        return false;
}

    public boolean setTid(int t){
        if(t>0){
            tid=t;
            return true;
        }
        return false;
    }
}
