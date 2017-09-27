package services;

import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.*;


@Path("/quizService")
public class QuizService {

    private static Oversikt o = new Oversikt();

    @GET
    @Path("/Oversikt/getOversikt")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection<Quiz> getOversikt() {
        return o.getOversikt();
    }

    @GET
    @Path("/Oversikt/getSpm/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Collection<Spm> getSpm(@PathParam("id") int id){return o.getSpm(id);}

    @GET
    @Path("/finnScoreboard/{qId}")
    @Produces({MediaType.APPLICATION_JSON})
        public Collection<Spiller> finnScoreboard(@PathParam("qId") int qId){
        return o.finnScoreboard(qId);
    }

    @POST
    @Path("/addSpm/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public int addSpm(@PathParam("id") int id,Spm spm){
        return o.addSpm(id,spm);
    }

    @POST
    @Path("/addSpiller/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public int addSpiller(@PathParam("id") int id,Spiller s){
        return o.addSpiller(id,s);
    }

    @GET
    @Path("/getSpiller/{qId}/{sId}")
    @Produces({MediaType.APPLICATION_JSON})
        public Spiller getSpiller(@PathParam("qId") int qId, @PathParam("sId") int sId){
        return o.getSpiller(qId, sId);
    }

    @GET
    @Path("/getQuiz/{qId}")
    @Produces({MediaType.APPLICATION_JSON})
    public Quiz getQuiz(@PathParam("qId") int qid){
            return o.getQuiz(qid);
    }

    @POST
    @Path("/addPoeng/{qId}/{sId}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void addPoeng(@PathParam("qId") int qId, @PathParam("sId") int sId){
        o.addPoeng(qId, sId);
    }

    @POST
    @Path("/addQuiz")
    @Consumes(MediaType.APPLICATION_JSON)
    public int addQuiz(Quiz q){
       return o.addQuiz(q);
    }

}
