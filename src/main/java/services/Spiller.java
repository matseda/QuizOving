package services;

/**
 * Created by medavidsen on 19.09.2017.
 */
public class Spiller {
    private int id;
    private String navn;
    private int poeng=0;


    public Spiller(){

    }

    public Spiller(String navn){
        this.navn=navn;
    }

    public String getNavn(){
        return navn;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPoeng(){
        return poeng;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public void setPoeng(int poeng) {
        this.poeng = poeng;
    }

    public void addPoeng(){
        poeng++;
    }
}
