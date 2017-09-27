package services;

import sun.security.provider.ConfigFile;

import java.util.*;

/**
 * Created by medavidsen on 19.09.2017.
 */
public class Quiz {
    private int id;
    private String navn;
    private Date startTid;
    private ArrayList<Spiller> spillere = new ArrayList<Spiller>();
    private ArrayList<Spm> spm = new ArrayList<Spm>();
    private int teller=0;

    public Quiz()
    {}

    public Quiz(String navn, Date startTid){
        this.navn=navn;
        this.startTid=startTid;
    }

    public void setId(int id){
        this.id=id;
    }

    public int getId(){
        return id;
    }

    public void setNavn(String navn){
        this.navn=navn;
    }

    public void setStartTid(Date d){
        startTid=d;
    }

    public String getNavn(){
        return navn;
    }

    public Date getStartTid(){
        return startTid;
    }

    public int addSpiller(Spiller s){
        spillere.add(s);
        s.setId(teller);
        teller++;
        return teller-1;
    }

    public int addSpm(Spm s){
        spm.add(s);
        return spm.indexOf(s);
    }

    public List<Spm> getSpm(){
        return spm;
    }

    public ArrayList<Spiller> getSpillere() {
        return spillere;
    }

    public void setSpillere(ArrayList<Spiller> spillere) {
        this.spillere = spillere;
    }

    public void setSpm(ArrayList<Spm> spm) {
        this.spm = spm;
    }

    public Spiller getSpiller(int sId){
        for (Spiller aSpillere : spillere) {
            if (aSpillere.getId() == sId) {
               return spillere.get(sId);
            }
        }
        return null;
    }

    public void addPoeng(int id){

        for (Spiller aSpillere : spillere) {
            if (aSpillere.getId() == id) {
                spillere.get(id).addPoeng();
            }
        }
    }

    public ArrayList<Spiller> finnScoreboard() {
        return spillere;
    }
}
