package services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by medavidsen on 19.09.2017.
 */
public class Oversikt {
    private ArrayList<Quiz> liste = new ArrayList<Quiz>();
    private int teller=0;

    public int addQuiz(Quiz q){
        liste.add(q);
        q.setId(teller);
        teller++;
        return teller-1;
    }

    public List<Spm> getSpm(int id){
        return liste.get(id).getSpm();
    }

    public Quiz getQuiz(int id){
        return liste.get(id);
    }

    public ArrayList<Quiz> getOversikt(){
        return liste;
    }

    public int addSpm(int id, Spm spm){
        return liste.get(id).addSpm(spm);
    }
    public int addSpiller(int id, Spiller s){
        return liste.get(id).addSpiller(s);
    }
    public Spiller getSpiller(int qId,int sId){
        return liste.get(qId).getSpiller(sId);

    }

    public void addPoeng(int qId, int sId){
        liste.get(qId).addPoeng(sId);
    }

    public ArrayList<Spiller> finnScoreboard(int qId){
        return liste.get(qId).finnScoreboard();
    }

}
