https://www.youtube.com/watch?v=e2zIr_2JMbE
What if you could learn the 20 agentic design patterns the pros actually use—without wading through a 400-page manual? In this practical 63-minute breakdown, I translate a Google engineer’s book into plain English and show you exactly how to apply each pattern in real workflows. You’ll see where each architecture shines, the tradeoffs that matter (cost, latency, failure modes), and quick ways to combine patterns for robust systems—so you can ship reliable agents faster and avoid over-engineering rabbit holes. Expect concise TL;DRs, labeled visuals, and a free repo packed with diagrams, ASCII flows, and Mermaid files to help you implement immediately.

[Main Topic]: A practical, plain-English guide to 20 agentic design patterns

[Key Benefits or Outcomes]: Understand when/why to use each pattern, reduce hallucinations and cost, add safety/quality gates, route work across models/agents, and ship production-ready automations with fewer retries and rollbacks

[Tools or Techniques Covered]: Prompt chaining, routing, parallelization, reflection loops, tool use, planning/orchestration, multi-agent collaboration, memory management, learning/feedback, goal tracking, exception handling, human-in-the-loop, RAG, inter-agent comms, resource-aware model routing, reasoning strategies (CoT/ToT, debate), evaluation & monitoring, guardrails/safety, prioritization, exploration/discovery

⏳ TIMESTAMPS:
00:00 – Intro: Why agentic patterns separate pros from beginners
00:36 – What you’ll get: TL;DRs, visuals, free resources
00:54 – Pattern 1: Prompt Chaining (assembly-line steps & validations)
05:42 – Pattern 2: Routing (smart triage to specialist agents)
09:30 – Pattern 3: Parallelization (split, normalize, merge)
13:16 – Pattern 4: Reflection (critic → revise → pass)
15:51 – Pattern 5: Tool Use (discover, authorize, execute, fallback)
18:19 – Pattern 6: Planning (milestones, dependencies, constraints)
20:49 – Pattern 7: Multi-Agent Collaboration (manager + roles + shared memory)
23:45 – Pattern 8: Memory Management (short/episodic/long-term, retrieval)
26:42 – Pattern 9: Learning & Adaptation (feedback → prompts/policies/tests)
29:17 – Pattern 10: Goal Setting & Monitoring (KPIs, drift, course-correct)
31:34 – Pattern 11: Exception Handling & Recovery (classify, backoff, fallbacks)
34:11 – Pattern 12: Human-in-the-Loop (review cues & approvals)
36:01 – Pattern 13: Retrieval (RAG): parse, chunk, embed, rerank
38:14 – Pattern 14: Inter-Agent Communication (protocols, IDs, expiry)
43:08 – Pattern 15: Resource-Aware Optimization (route by cost/complexity)
46:35 – Pattern 16: Reasoning Techniques (CoT, ToT, self-consistency, debate)
49:57 – Pattern 17: Evaluation & Monitoring (golden sets, SLAs, drift)
52:44 – Pattern 18: Guardrails & Safety (PII, injection, sandboxing)
56:04 – Pattern 19: Prioritization (value×effort×urgency×risk, re-order)
59:29 – Pattern 20: Exploration & Discovery (map space, cluster, probe)
62:17 – Free Repo & Diagrams (ASCII + Mermaid)
63:08 – Final CTA: Share, comment, and join the community


There are 20 agentic design patterns that separate pros from beginners. A Google engineer recently released a
0:06
400page book on agentic design patterns. And in this video, I'm going to give you a summary of that book in plain English.
0:13
I spent hours trying to simplify these architectures to make them as easy to understand as possible. No jargon, no
0:19
theory, just practical patterns that you can use today. And each one of these patterns could solve an actual problem
0:25
that you're facing right now. And if you watch till the end of the video, you'll have a deeper understanding of agentic
0:30
structures and I'm going to give you tons of stuff for free to help upskill you as well. So without further ado,
What you’ll get: TL;DRs, visuals, free resources
0:36
let's dive into it. So I have 20 agentic patterns that we're going to dive through today. And each one has a set of
0:42
visuals. So it's not going to be some clear-cut and dry just plain text. We're going to walk through actual workflows
0:48
where I did my best to label what would happen in each pattern in plain English. And the first one we're starting with is
Pattern 1: Prompt Chaining (assembly-line steps & validations)
0:54
prompt chaining. Now, for each one of these, I'm going to give you a summary TLDDR, too long, don't read of what is
1:00
involved in this design pattern, and then I'll walk through very quickly when you could use it, where you could use
1:06
it, the pros and cons, and some actual applications for that pattern. And my idea is whether you watch this or you
1:12
take the transcript of this video, you could essentially feed your Claude code or your cursor or where have you this
1:18
transcript and it would understand which pattern it should employ for what kind of problem. So prompt chaining is where
1:23
you break a big task into smaller steps and you run one after the other. And the good thing about prompt chaining is it
1:30
gives multiple areas to basically catch a failure before it happens because each step in that chain, that's why it's
1:36
called a chain, validates the output of the one before it before it passes data to the next one. So you can think of it
1:42
like an assembly line where each station completes its part, checks quality, then hands it off to the next section. So
1:48
tactically you would have some form of user input and then that user input would be broken down into subtasks. Once
1:55
the data contracts or contracts between these tasks are created then you go and
2:00
execute task one. Then when you go through executing task one you want to validate the output of task one. So task
2:07
two will now validate first that the test passed or the data actually passed properly from output one and then we go
2:13
to output two and it keeps going and it if it fails it retries until it finally passes and in this case we only go
2:20
through three executions but theoretically prompt chaining could be infinite assuming your budget is
2:25
infinite for LLM costs but there is diminishing returns so if you put 50 different language model chains together
2:32
at some point you're either adding too much or you're basically pushing it to the limit where it starts hallucinating
2:37
on something it wouldn't have hallucinated before. It starts to overthink. So there is a magic number
2:43
depending on your workflow where it could be from three to five different parts of that chain where it's good
2:48
enough to do that validation. And the idea is is that you merge all the results. You assemble the final output.
2:53
You log all the artifacts. So anything that happened throughout the entire chain. So if something does go wrong or
2:59
your output looks a little bit suspicious, you can go back through the entire chain and see exactly where that happened. So in terms of when to use, I
3:05
use prompt chaining a lot in all kinds of flows, whether it be an automation, an agentic automation or both. And you
3:11
can think of it as very useful with complex multi-step processes, data transformation. So imagine you have
3:18
really dirty data or data that's just not standardized or fully structured. You could have a pipeline with a mix of
3:24
generative AI and non-generative AI. So let's say Pythonic or JavaScript where it goes through and each part has a
3:30
pass. So let's say you had awful columns. they're not properly labeled. Step one could be let's label all the
3:36
columns based on the first couple rows of data using Genai and then assuming that it makes sense it passes it goes to
3:42
the next step where now maybe we clean and make sure that each row has the proper type of data in the right
3:48
expected structure and these multi-step processes is where prompt chaining can help a lot. So given that it's helpful
3:54
for things like document processing data ETL code generation and one that'll basically reemerge over and over again
4:00
is content creation. A lot of these design patterns depending on your flow for content creation is very helpful. So
4:07
the pro of using this design pattern is it's modular, meaning you can swap in or swap out different parts of the chain
4:13
and not necessarily break the entire flow, assuming that the chain you input is very similar to what is expected from
4:20
the other parts of that chain. But one of the major cons for this is context explosion. And this is essentially
4:25
because you're going from maybe step one to step seven. And what if you were carrying over all the context from step
4:32
one all the way to step seven? So you could theoretically have a lot of data depending on what kind of structure this
4:37
data is. So imagine it's JSON, JavaScript object notation or something that's a payload structure. Those are
4:44
very expensive on the token side. So if you keep looping those and adding it to the next part of the chain, you can now
4:50
end up at step seven where you have all of this context and all the prompts and now your new prompt for step seven and
4:56
now the likelihood for hallucination could beat or defeat the whole purpose of doing this to begin with. And the
5:02
next thing is if your prompts are not very well tested, then it could pass. So let's say you go from chain one to chain
5:08
two to chain three and somehow it passes, but there's an actual error or it shouldn't have passed to begin with.
5:14
So that's a prompting issue. You then have error propagation where every single node or every single part of that
5:20
chain is inheriting the first mistake you made. And obviously this is going to be slower because you have multiple
5:26
points of inference which in plain English means multiple points where a language model is going to have to be intervening. So you have to wait for
5:32
that to run before the next step. And then applications of this could be legal document analysis, e-commerce product
5:37
descriptions, academic research assistance and anything related to report generation. The next design
Pattern 2: Routing (smart triage to specialist agents)
5:42
pattern is routing. And routing in plain English is where you have incoming requests that get analyzed and sent to
5:49
the right specialist agent based on what they need. And you can think of it like a smart receptionist or an operator who
5:55
listens to what you need and directs you to the right person or the right department depending on tech support,
6:01
accounting, etc. And the key thing here is if the operator is unsure, they should go back and ask you some more
6:07
clarifying questions to better understand where to route that request. So using that as a segue, you have a
6:12
user request. The AI then analyzes the intent and the context behind that
6:18
request. So once it does that, it has to make a decision and that decision will be whether or not it should be going to
6:23
the technical support agent, the sales agent, the account management agent or
6:28
any of the other agents in your workflow. And if it doesn't know, the key thing here is it's going to request
6:33
clarification until the confidence is higher. Now confidence could be a number generated by an LLM where it goes
6:39
through the decision and you ask in the prompt out of 10 tell me how sure you are. Now again you open yourself up here
6:45
to hallucination because what if it says it's an eight but actually meant six and if you ran it again it would have been
6:51
five or six. So in this case it could be helpful to add something deterministic where you have something statistical
6:56
that takes a look at the decisions and assesses it in some way that gives you a number that you can rely on to go back
7:01
in that loop. And once you get a response from any of the agents that it ends up routing to, it goes to either a
7:07
success or a failure. And then it comes to some form of decision and delivers the end result. Whether that be a piece
7:13
of information, a summary or what have you. This makes sense when you have multiple domains. So you have like we
7:19
said technical, we have accounting, we have finance, we have different departments or specializations for our
7:25
agents that we'd have to basically distribute to. And it's also helpful because if you have a specific tool that
7:31
can only or should only be invoked with a specific path or a specific department, this is helpful to segregate
7:37
all those different paths. And it'll also help prevent misfires where an agent uses a tool it shouldn't have used
7:43
or thought it should have used or ends up doing a whole process without executing the very tool it needed to
7:49
come to that conclusion. which if you use something like NAD, you'll notice all the time if you actually watch
7:54
what's happening with the AI agent node, it will sometimes use a tool then not use the tool then decide to end up using
8:00
the tool last minute and then you get the end result assuming that the whole process was correct to begin with. So
8:05
like the example, this is great for customer service, enterprise automations and healthcare triage, especially if you
8:12
have some form of healthc care front-end receptionist that is a voice agent that takes calls and it either routes it to a
8:18
specific department. It basically does a booking or does something along the lines of answering questions on when are
8:23
you open, what services do you have? So, these could be different parts of that specific chain. The pros here is that
8:29
you have specialization, scalability, and efficiency. But on the con side,
8:34
because you have multiple possible paths, you can always route to the wrong path. And in the real world, it's less
8:40
likely for that to happen because if you have someone on the phone asking you clarifying questions, they literally won't let you pass until they know
8:47
exactly where to route you. And if they don't know, they'll probably ask their manager. So with that same analogy, it
8:52
might make sense to add to that workflow some form of manager agent that assesses
8:57
the decision of the initial agent. But one of the many things to look out for is this specific one here, which is
9:03
being prone to edge cases. So you could have a case that comes out of nowhere. And it's good to have some form of
9:10
confidence interval or confidence marker. So you can basically quarantine or add in a human in the loop if there's
9:16
one case that just can't be properly tagged. And again, one of the best applications for this is likely in customer service or anything that's
9:23
front-facing from a business standpoint. Now, the next one is parallelization, which in plain English means splitting a
Pattern 3: Parallelization (split, normalize, merge)
9:30
large job into independent chunks that can be processed at the same time by multiple workers. And when we say
9:36
workers here, that is a proxy for agents. And the analogy here is like having 10 people each read different
9:43
chapters of a book simultaneously, then combining all the summaries at the end. So each one works on one separate
9:48
chapter, then we put it together to create the book. In practice, this looks meaty, but it's actually not too difficult. So you have some form of
9:55
large input. Then that input is analyzed. Then that analysis determines
10:00
how you're going to split that big task. So imagine you're working at a company and the CEO of that company tells you go
10:07
and reduce our customer churn for our SAS platform by 20%.
10:12
Now that 20% is a huge ambitious goal and what you have to do is take that goal break it down into independent
10:19
units in this case subtasks that can lead to accomplishing that goal. So for example you could run some form of
10:25
survey across those customers to see why are people leaving. Maybe you have some exit interviews so you have a better
10:31
understanding of why or what problems might lie in the underlying SAS platform. In the same way, the agent
10:37
here has to check resources, see what resources it has available to it, and then once it sees what it's dealing
10:43
with, it can spawn up parallel workers. And each of these workers can work on subtasks that lead to accomplishing that
10:51
bigger goal. So you can think of each one of these workers as employee agents where each one retries and works until
10:57
it succeeds its specific task. And if it fails, it keeps going in a loop until it
11:02
goes through. And then once you collect all the results from all of the workers, you then normalize them, which just in
11:09
plain English means you make them into a same format. So it's like having apples, oranges, and pineapples. You want to
11:15
make sure that all of them are apples or all of them are pineapples or all of them are oranges. And then you merge
11:21
those results. You simplify it to a single output. Then you generate a summary. And what providence here is
11:27
like you're citing which parts of this final output came from which workers. So
11:32
if you understand where the failure point is, you can go and have a conversation with that specific worker,
11:38
which in this case means adjusting the prompt or adjusting the system for that worker to make sure you get the right
11:44
coordinated result. So this is helpful to use with largecale data, time-sensitive operations where you need
11:50
to break something down very quickly and you want some way to draft some agents to help you break it up. And then web
11:56
scraping is a good example cuz web scraping has multiple processes. You can go on a page, inspect the elements, see
12:03
whether or not it's HTML or how you want to use JavaScript. Then you break it down into different processes. Maybe you
12:08
crawl different pages. So you can think of a very meaty process in this regard. where it fits are things like document
12:14
processing, data enrichment, research automation, and testing frameworks. And in terms of the pros and cons if you put
12:21
them side by side. So pros are, like I said before, specialization, it can scale because technically like a
12:27
company, you can keep adding more employees, but in this case, you don't need to raise venture capital funding to
12:32
do that. You can just add more resources. But you'll see this con happen over and over again in these agentic design patterns where as you add
12:39
more employees naturally a normal company it adds more complexity adds more layers adds more drama you might
12:45
need to hire HR so in the same way you might need to bring in an agentic version of HR to now manage these
12:50
workers better and then obviously unifying all of the outputs from the workers sounds easy when I say it but
12:56
when you're tactically doing this in the real world it's sometimes hard to equate or equalize all of those same parameters
13:03
and variables. So from the real world applications, I would say the news aggregation service is the one I've seen as well as document intelligence systems
13:10
as well. The next one is reflection. And reflection is exactly what you would anticipate it to be where you generate a
Pattern 4: Reflection (critic → revise → pass)
13:16
first draft, then you have a critic review it against quality standards and then based on the feedback, you revise
13:23
and you improve. And you essentially repeat this until you meet your quality standards. So the analogy here would be
13:28
like writing an essay, having a teacher review it for you, and then making improvements until you finally get a
13:34
passing grade. In terms of general structure, not too tricky. So you have some form of initial request, you
13:39
generate a first draft, then you have initial output, then you have this critic agent that goes through the
13:45
output and assesses what needs to happen to make this better. So in this case, we could apply quality rubrics where you
13:50
literally create a rubric for this agent to assess the output. You run unit tests
13:55
which are predisposed tests that you've put together for edge cases and things that you're looking for. And then let's
14:02
say it is the essay example. In this case, it would be grammar and logic check. So assuming that all of these pass and meet the quality bar, then if
14:09
it meets the criteria, we go down this path here. You accept the output. You record success patterns. You update any
14:15
prompts or rules if anything's needed and you're good to go. But if it doesn't pass, then you generate some structured
14:20
feedback. Very similar. So imagine having one agent generate structured feedback that goes back into that loop
14:27
to the original agent and goes back and forth until you finally reach all of those quality standards. Now let's say
14:32
there's a fundamental flaw in your workflow or automation you're building. You then have to ideally have a max
14:38
count. So loop through until you meet the standards. You have three times very similar to school where you couldn't
14:44
endlessly submit an essay in like grade five or six. You would have maybe one or two tries and then after that the grade
14:50
is the grade. So when to use this is if you have to really keep track of quality control and you have complex reasoning
14:56
tasks or tasks that are more creative where you want to use the chaotic feature of a language model but you
15:02
don't necessarily want to have a chaotic result that's unpredicted every single time. Where this fits is anything around
15:08
really content generation. So content legal academic writing product descriptions for products. So imagine
15:14
you had an agentic system. You have an Amazon FBA store. you have thousands of products, you're trying to find ways to
15:20
write descriptions for each one of them that's not formulaic and AI slop. This could be an example where you adjust and
15:26
use this pattern. The pros is essentially you're focusing on quality, which is awesome. What is not awesome is
15:33
the cost. Any form of API throttling. So let's say you're ripping requests over and over again for each product and you
15:39
have 10,000 products and you're running them all at the same time. You can have ways where the API will just time out.
15:45
So this specific pattern needs a lot of planning. And like I said, anything related to content generation is where this would be really helpful. So the
Pattern 5: Tool Use (discover, authorize, execute, fallback)
15:51
next one is tool use. And this one is straightforward as well. So when the AI needs external information or actions,
15:57
it discovers available tools, checks permissions, and then calls the right tool with proper parameters. So it's
16:03
like a chef who needs ingredients, checks what's available in the pantry, then verifies they can use it, and then
16:09
retrieves and actually uses it in the recipe. So tactically, you have a user make a request. You analyze those
16:14
specific requirements. you discover what tools you have available. So in this case, let's say we have an agentic tool
16:20
that has access to the web search API, database query tool, calculator function, file system access, and other
16:27
APIs. We then select which tool should be used. And this alone can be tricky
16:32
depending on what kind of generative AI, if you're using a reasoning model or what have you. And then you match the
16:38
capabilities to the need. So you do a safety check. Did I basically choose the right tool for the job? If it passes,
16:45
you prepare the tool call. You execute the tool call. If it doesn't work for whatever reason, again adding some logic
16:51
here as to whether or not or how many times it should loop through. And then as you go through, you have the parse
16:58
tool output. You have a fallback method. You can do normalization with the language model where you have the
17:04
language model take the outputs of this automation and then basically configure in a way or format it in a way that's
17:11
easier for it to interpret or use. Now, if you don't use the right tool and you fail, then ideally there's some form of
17:17
reason. So, you deny access to using the tool with a reason saying you use the wrong tool and let's log this so that
17:24
someone like me can intervene and add some more flavor and change the structure of the agentic workflow to
17:30
work a little bit better. So, tool use is used all over the place. So, the applications are endless. So, I won't
17:35
touch on that too much, but anywhere where it's multi-step is much more helpful. where it fits, research
17:40
assistance, data analysis, customer service, content management, and in terms of pros and cons, you have the
17:47
quality improvement, you have error reduction, and on the con side, you have, like we said before, if we have a
17:53
misfire and we use a tool and it says it passed, but it shouldn't have passed, then you carry that same mistake over
18:00
through the entire workflow. So you can think of this as starting a math equation back in elementary school and
18:06
you're doing division and you divide incorrectly in step one. Everything you do after that point will be wrong
18:13
because your essential first step was wrong too. Now for the rest of them since you're getting the gist of this I'm going to just glance through the
Pattern 6: Planning (milestones, dependencies, constraints)
18:19
real world applications. You'll basically get it into where it fits. Planning straightforward again where you have some form of big goal and you
18:26
create a step-by-step plan. This is what I do personally when I use things like clawed code or cursor. I don't write
18:32
code for like 40 minutes or AI doesn't write code for 40 to 50 minutes. I plan and plan and plan until it's ready to go
18:39
and I know exactly what's going to happen. Then I let it run. And even then, sometimes the AI manages to still
18:45
hallucinate some parts, but it's a much better way to compartmentalize everything you're trying to do and
18:50
execute it in the most efficient way possible. So this one is like planning a road trip with checkpoints, monitoring
18:56
traffic and routing where needed. So in this case, you have some form of goal input and then you break it down into
19:02
milestones. You create what's called a dependency graph and then you check your constraints. So in this case, if it's
19:08
data oriented, it could be data availability. It could be authorization, could be budget limits, could be
19:13
deadlines of any form. And then you generate a step-by-step plan. You assign which agent or agents should be used and
19:21
what tools of those agents and then you just go and execute each step. So similar structure to prompt chaining
19:27
except you're not necessarily carrying over the output of the previous one to the next one. You're basically going through sequentially until you get to
19:34
step number n. N could be six steps, 10 steps. You track your progress and assuming your goals are met, then you go
19:42
through the acceptance criteria and you're good to go. Otherwise, like we said, you're going to see this theme
19:47
recurring. You have some form of backup where if this doesn't work, you analyze what happened and assess whether or not
19:54
there's new information. If so, if this is an edge case, like I said before, maybe it deserves a human in the loop.
20:00
Otherwise, you want to escalate that issue, handle the exception, and then you're good to go. So, this is especially helpful with things like goal
20:07
oriented workflows where you have again ambitious goal, but you want to break it up into substeps to get to that goal. So
20:13
this is good for project management, software development or research projects. And in terms of the pros and
20:19
cons, the big pro is that you have very strategic execution because the more time you spend planning or the more time
20:25
the agent spends planning, it has more clarity on exactly what it should do. And by nature of that, it makes your
20:31
entire workflow or automation a lot more adaptable to new variables, new environments. The biggest con though is
20:37
the setup and the complexity and coordinating all those agents to make sure that each one has the right tool,
20:44
each one has the right system prompt and that you have the proper fallback mechanism if things don't go right. This
Pattern 7: Multi-Agent Collaboration (manager + roles + shared memory)
20:49
next one is multi- aent collaboration and this is one that you would expect and you see all the time especially with
20:55
those humongous anend workflows with seven agents, six sub agents and you
21:00
have that whole network. So the crux of this one is that you have multiple specialized agents working together on a
21:06
different part of a complex task coordinated by some central manager. In many cases they share a common memory
21:12
which is important here because if you share a common memory then your memory mechanism whatever that is an MCP server
21:19
any form of function has to be well structured so that all the memories don't overlap but you focus on the
21:25
proper memories that need to persist. And my analogy here is like having a film crew where the director coordinates
21:30
while camera, sound, and lighting specialists each handle their part sharing the same script and timeline. On
21:36
the multi- aent side, you have some form of complex task and then because of that task, you have to define specialist
21:43
roles. So you might have an agent that literally just decides what other agent should be chosen which is similar to the
21:49
idea before where we had that operator but in this case the operator has to be an agent where depending on what we're
21:55
looking for in the task it decides okay let's use a research agent or the analysis agent or what have you and then
22:01
in your infrastructure you should have some form of shared resources whether that be shared memory stores artifacts
22:07
version control and then once you have the coordination protocol as it's referred to you have your orchestrator
22:13
ator go through and then the coordinator manages the flow. It assigns it to each
22:19
agent. It assigns each task to the right agent. So imagine you had a a sauna board or a Jira board and you have a
22:25
bunch of tickets. The coordinator is essentially tagging each ticket to one or more agents and after each one
22:32
finishes they have some proverbial contract until they go to the next agent and each one goes through checks off and
22:39
the contract again using my analogy of tickets. Each ticket on a project management software has criteria,
22:46
acceptance criteria. Assuming that acceptance criteria has been met, then you can go to the next stage. And then
22:51
there's an overall acceptance test. If it passes, you're good to go. If it fails, maybe you go and run a
22:57
simulation. You loop back. You make sure and see where did the coordination fail. And again, you can set some form of max
23:03
here where it doesn't keep retrying for infinity. So out of all of these, one of the best applications of this is for
23:08
iterative refinement, which really lends itself well to AI or general product
23:14
development where there's multiple phases, multiple tickets, and then different ways to solve the same
23:19
problem. So software development, product development, financial analysis, content production or creation and
23:24
research projects is where this shines. And in terms of the pros and cons, the pros like before you have the ability to
23:31
specialize and you have parallel processing. But on the con side, once again, all of these systems need to be
23:38
set up and tested and tested over time as these language models evolve and drift. The last section acts as a great
Pattern 8: Memory Management (short/episodic/long-term, retrieval)
23:45
segue for memory management where this is classifying incoming information as
23:50
short-term conversation, episodic events, or long-term knowledge. And you store each type appropriately with
23:56
metadata like recency and relevance. And this is exactly how your brain keeps track of things briefly. Some like
24:02
specific memories or permanent knowledge, things that you will never forget. And one thing I would say here is that there are so many tools and MCP
24:09
servers trying to solve this. And I've yet to find something perfect because I noticed that depending on what you're
24:15
trying to build agentically, memory management is really contextually specific on what you're trying to
24:20
remember and what is not worth remembering. But the main idea is you have some form of user interaction. You capture information and then you decide
24:27
what kind of memory would this be? Is this something I have to remember in the long run? Is this short-term memory? Is
24:32
this knowledge that I have to store in perpetuity forever? So is this episodic memory? Is this long-term memory? Is
24:40
this something I'm just going to keep for the remainder of this session? So that's why it says here, is context window full? If yes, then you compress
24:47
whatever it is you're trying to remember or you compress your existing memories because you don't have to hold on to them anyway after the session. Now, if
24:54
you do need to store them, then you need to index them and then add metadata, add a recency score, create frequency or
25:00
topic tags so it's easy to retrieve those. Think of something like a vector database of sorts where you need some
25:06
way to generate your top five results. based on a single question. And on the shorter term memory side of things, you
25:13
want to retrieve a memory if it's relevant. You want to query your memory store. Maybe you want to apply some filters by rule, time horizon, or topic
25:21
match. Then you pick the right memories that you should use. And then you process the request. And if privacy is
25:27
an issue, this is where you deal with that. Whether you redact anything from that memory or you save a different
25:34
version of that memory, then if so, you update your memories and then you continue the interaction. So this is not
25:39
a a gentic pattern of its own. This is more so a subset of where you'd use it in other gentic patterns. So the main
25:46
use case with long-term memory management is conversational continuity. So ideally if you talk to Claude, you'd
25:52
be able to have that conversation with Chad GBT with the exact same context without having to reexlain who you are,
25:59
what you do, or what you're trying to accomplish. This is awesome for experiences that require tailoring. So
26:04
customer service, personal assistance. I'd say the biggest application that I could see is educational assistance or
26:10
platforms where they learn that you struggled with concept A. So when you go to concept B, it knows that you have a
26:17
weakness with concept A. So it basically overexlains parts of concept B that are dependent on understanding concept A.
26:23
The pro is obviously context preservation over time. But on the con side, you want to make sure that as you
26:28
store memories, you're not compromising security. You're not over storing memories. You have a way to flush out
26:34
older memories or you have a system to determine when a memory is indeed old. The next one is learning and adaptation
Pattern 9: Learning & Adaptation (feedback → prompts/policies/tests)
26:42
where this is collecting feedback from user corrections, ratings, and outcomes. You want to clean and validate the data
26:48
to remove noise and then you use it to update prompts, policies, or examples. It's like adjusting a recipe based on
26:55
customer feedback and taste tests. So essentially, you'd have some form of system operation and you collect
27:01
feedback from a feedback source. That could be some form of correction from a user, quality ratings, automated
27:07
evaluations, or some form of rubric or task outcomes. You then take these quality signals or these feedback
27:13
signals. You do a quality check and then you either dn noiseise it, you clean it. If it's something malicious, like you're
27:19
a restaurant and they say there's cockroaches everywhere, but there's not a cockroach in sight. So, you maybe
27:24
disregard but you log that specific review. Additionally, you want to make sure that your main system doesn't have any fluff or noise in it. So, you go
27:31
through this process and then you decide how is this going to be quote unquote learned? Am I going to update the
27:39
prompts associated with my workflow? Am I going to update my policies examples in the prompts? If you're doing a
27:45
multi-shot prompt, am I going to update existing preferences in the tool or product itself? Am I going to fine-tune
27:51
a model? This is very rare that you'd want to do that, but it is an option that you can use. Then after this, you
27:56
do some form of AB testing. you monitor the performance after taking in the feedback to see has this course
28:02
corrected this agent to do a better job at whatever. So naturally this is a great system to use if you need feedback
28:09
incorporation and you need to have some way to have a feedback loop and stimuli taken into the system so that the system
28:15
learns in whatever way learning is for you whether it's the prompt itself or the knowledge base or any form of policy
28:22
that your agents adhere to. So where it fits is similar to memory management anywhere where there is a tailored
28:27
service where you are receiving feedback from a customer or an avatar. So the pro and con is that you have continuous
28:34
improvement but on the con side you have training costs right. So every single time you're updating a prompt you're
28:40
having probably a language model do that. So these things become a combinatorial cost problem where as you
28:46
keep adding more and more checks or feedback loops you're also adding more cost. And now you could learn something
28:52
wrong. Right? So what if someone said the restaurant is full of cockroaches and now your system learns that it has
28:59
cockroaches. So it says something like warn people before they book with your restaurant that there are cockroaches
29:05
everywhere. So you could learn the wrong thing. So you want to make sure that you have some checks and balances against
29:10
that. The next one is goal setting and monitoring. And this one is basically defining specific measurable goals. A
Pattern 10: Goal Setting & Monitoring (KPIs, drift, course-correct)
29:17
lot of times they call these smart goals. Specific, measurable, achievable. Two other ones I I forget right now. I
29:23
think realistic and then time based. Yeah, you have measurable goals with deadlines and budgets and then as work
29:29
progresses, you continuously monitor metrics and compare to targets and it's like having a GPS that sets a
29:35
destination, monitors your progress, and then recalculates when you're off course. So, how the system works is you
29:40
have some form of objective that is defined. Then you create these smart goals. So, you have everything that I
29:46
mentioned before. You set your constraints. Let's say your your main constraints that you deem as the most
29:51
important are time and resource and budget. Then you define some metrics or KPIs, key performance indicators for
29:58
this agent. Then you go through some quality gates. Quality gates is essentially just double-checking that
30:03
everything's in line. You begin your execution. You go through continuous monitoring. You track progress, create
30:09
checkpoints, have status events. You collect those metrics. You compare them to targets. And then you go through this
30:15
entire rest of the system. If the system starts to drift because it's not adhering to your KPIs or your metrics,
30:22
that's where we go and analyze the cause and you decide what needs to happen. Do you need more resources? Do you need to
30:27
adjust the plan? Do you need to modify the scope in any way? And then if it does pass, then you continue the
30:34
execution. You make sure that your goal is achieved, whatever that goal was. And then if it isn't achieved, you escalate
30:40
it. Otherwise, it's successful. And theoretically here, you could generate some form of report summarizing
30:45
everything that happened. Then you have the goal achieved. In terms of where and when to use this, this is a more
30:50
advanced technique. So you'd use this for complex projects, really autonomous operations you're going for and
30:56
strategic execution. And on where it fits, it's for, let's say, sales pipelines, very sophisticated pipelines,
31:03
system optimization or cost management. I would likely use it only in these two occurrences. There's probably simpler
31:09
ways to create a sales pipeline. And on the pros is you try to be as efficient as possible with your resources. But on
31:16
the con side, you have potentially goal conflicts or rigid constraints throughout your system where you have to
31:22
run this quite a few times to catch any not only edge cases but any rigidities that pop up depending on the variability
31:29
of your input. Next up, we have exception handling and recovery. And I could summarize this whole sticky note
Pattern 11: Exception Handling & Recovery (classify, backoff, fallbacks)
31:34
in one line, which is this is just the way that you catch errors in your agentic workflows. So this is an agentic
31:41
pattern to help catch issues in your other agentic patterns. So essentially what you're trying to do is you do
31:46
something, you add safety checks, you make the call to these services or tools or both. Then you assess whether or not
31:53
it worked. If it didn't work, you take that error, you catch it, and then you have to assess and classify what kind of
32:01
error is it. Is it a permanent error? Meaning it's something that's not going to resolve itself. If so, it's good to
32:07
have a plan B in your workflow. If it's a temporary error, then try again. Wait a bit. So, sometimes we call this back
32:14
off or exponential back off where it waits 1 minute. Let's say there's a timeout with an API or you've sent too
32:20
many requests, maybe it backs off. That's why it's called exponential backoff and it goes back and tries again
32:25
in a minute. But obviously, you want to cap out how many times it should try because it could be that what you think
32:31
is a temporary failure is a permanent failure. So, for a critical response, you'd have an emergency response. You'd
32:37
save your current work, alert the team, determine whether or not it's safe to continue, and then you keep going until
32:44
you get to the point where you can continue working and you're unblocked. Otherwise, you need to maybe do a full
32:49
stop and reassess the entire system and see where the issue lies. In terms of backup options, this could be using a
32:54
simpler method, using saved data, using default answers, or getting again that human in the loop to assist. Then you
33:01
start the recovery process, which flows into the exact same recovery process from before. Now in terms of when to use
33:07
this, you can use this pretty much in every pattern, but specific ones are the ones where you need a lot of focusing on
33:12
error handling where errors are more prone to happen like systems that are actually in production, quality
33:18
assurance, cost management, and anything where there are vital and critical mistakes that you have to account for.
33:24
So this is one of those patterns that would be a good use case for enterprise AI deployments because there are so many
33:29
fail safes and plan B's and C's. So the pros and the cons are obviously that you have more performance visibility. You
33:36
can see exactly what's happening, what's failing, why it's failing, and have areas of recourse if it fails. And then
33:42
you have more user trust naturally because you have more fallbacks in place. But on the con side, there is a
33:48
lot of infrastructure and complexity to make this happen. And sometimes you might have a lot of false alarms. So
33:54
depending on how many times you get an alert, you should be very judicious or very specific about when or what is
34:00
worth an alert. So you don't get alert fatigue. It's kind of like the story about the sheep that cried wolf. When a
34:06
cried wolf multiple times and the wolf was actually there and they ignored the wolf. So the same analogy applies here.
Pattern 12: Human-in-the-Loop (review cues & approvals)
34:11
This next one is human in the loop which like the name says is adding a human in the loop where there's low to high risk
34:17
depending on the situation or most importantly edge cases. So this one we can kind of like breeze through because
34:22
it's pretty straightforward or you have some form of agent processing, you have a decision point and one of those
34:28
decisions could be that a review is needed or you need to actually step in and intervene. So a good actual tactical
34:35
example is imagine you're using some form of agentic browser or agent mode in chat GBT. At some point it will realize
34:42
it needs you to step in to add your credentials to log in to your email to Upwork to whatever service it is. And
34:48
that's where you have a review cue and then you prioritize by urgency if it's multiple things. You present in the UI
34:55
like agent mode and chat GBT where it physically tells you Mark please intervene and take over and then give me
35:01
back control once you're done. It shows full context displays differences. There's usually some form of timer. And
35:07
on the human side they can decide whether to deny, edit or take over or whether to approve. And assuming that
35:14
the human approves, it goes through the rest of the workflow. And assuming that no more intervention is required, then
35:20
this process is complete. So you want to use human loop anywhere where you have a highstake decision, you have regulatory
35:26
compliance, where you can't leave it up to a generative AI model to hallucinate, and when you want to catch things like
35:32
edge cases. So it fits everywhere. There's only a few examples here like content moderation and medical diagnosis, but it fits everywhere you
35:38
can imagine. So the pro is that you have more trust in the system because you know exactly where the failure points
35:44
are and what the next course of action is with a human when you reach that failure point. When you're adding human
35:49
in the loop, you're naturally adding more latency or more buffer time to that system because you're it has to wait for
35:55
you. So if you take 10 minutes to intervene, then that's the system running 10 minutes longer than it should
Pattern 13: Retrieval (RAG): parse, chunk, embed, rerank
36:01
be. This next pattern is very familiar to a lot of you where it's basically just rag. It's knowledge retrieval. So
36:07
just to define it, it's indexing documents by parsing, chunking, and creating searchable embeddings.
36:13
Literally rag. So it's like having a librarian and you want to categorize or index a series of information and
36:19
systems. So this one is pretty straightforward where you have a user query. You have some sources that you've
36:24
ingested. You've parsed those documents, categorized them, embedded them, which again means in plain English, you take
36:30
words, you turn them into vectors, you store vectors into library. So when you ask a question, you try to match the
36:37
vector of the question to the vectors in your library with the closest match. And then in terms of chunking strategies,
36:42
you have fixed size chunks, semantic boundaries, context aware chunks. There's all kinds of different ways to
36:49
do this. Then you generate embeddings like I said, you store it in something like a vector database. You get the
36:54
query. Is there if there's any form of rewriting for that query to make sure that you can get a better match, then
37:00
you would do that in the system. you would retrieve the top matches. So this is called top K. You could have five
37:07
matches, you could have 10 matches. Just be aware that the more matches you add to the system, the more that the
37:12
language model can choose and hallucinate from. In terms of reranking, this is where you would reassess all the
37:17
vectors and better organize them through scoring them and optimizing them to get better matches. So you can have more
37:23
grounded responses. You have citations potentially. You obviously have to test your rag and if it fails then you have
37:29
to go through adjust whatever parameters need to be adjusted. Then if it passes you deliver the response and then maybe
37:35
you have some form of metrics that you score on like precision or recall. Then you optimize the system and then your
37:41
rag technically would be complete. So you want to use this wherever you have document knowledge needs and that could
37:46
be small or large really depends on the scenario. So this fits anywhere where you have enterprise search, customer
37:53
support, research assistance, any form of documentation you need to split up and use. But rag is something a lot of
37:58
us know about. So this is not too hard to wrap your head around. So the pros is that you can add more accuracy and
38:03
scalability to your system, but it can come at the cost that you have to not only build infrastructure but maintain
38:09
that infrastructure, which means maintaining those vectors that you accumulate over time. This next one is
Pattern 14: Inter-Agent Communication (protocols, IDs, expiry)
38:14
definitely worth refining which is called inter agent communication. And this is basically where you have agents
38:20
communicate through a structured messaging system with defined protocols and then you have message including IDs
38:26
for tracking expiration times and security checks. So analogy here is it's
38:31
like an office email system with red receipts, security clearances and spam
38:36
filters that prevent reply all disasters. So this is where you have language models talking to other
38:42
language models. So from a system perspective, this is where you could have multiple AI agents speak to one
38:47
another and then you have to decide how they should communicate. So either they have one boss, one that manages all the
38:53
other agents, which is sometimes really helpful to have because you have a single vector of failure that everything
38:59
can report to. The next one is that everyone is equal, meaning everyone has a say at the table. It is a pure agentic
39:05
democracy which sounds great but in practice really hard to dial in because you're always dealing with the risk of
39:11
hallucination and misfiring. And then you have potentially like a big thread. Imagine you have a school community for
39:17
agents and all of them are looking at the board or the pinned posts and that's how they communicate. They communicate
39:22
as comments on those pin posts. So in this case that you set up communication rules, how they can speak, how they can
39:29
object, what happens when they have conflict with one another. In terms of message rules themselves, you either
39:34
have to track numbers for each message. You create an expiration for each message. So let's say you have a
39:40
conversation and you're now at 100 messages between all of the agents. You probably don't want to maintain or store
39:47
the third message from a singular agent unless that's one of the only things it's set. If there are important
39:52
messages, then you need a system to mark which one is important. So this is where you can get a lot of spaghetti where you
39:58
have agents on tops of agents. Then you have language models assessing those agents. So the number of potential
40:04
points of failure is very high. So what's interesting here is that you can even create a system where you can
40:10
designate which agent is allowed to speak. Then you verify their identity. You check what they can or can't do.
40:16
Depending on that, you can give them the green light for communication. They send a message, deliver it to a prescribed
40:23
agent. The agent gets the message, processes that message, and then it determines, do I need to reply or do I
40:29
need to execute the thing that the agent told me to do? But this is where it gets messy where you want to assess, do you
40:34
have any problems? If so, you could have an endless loop and when do you stop that loop? If all the agents keep
40:41
talking to each other and it just doesn't stop, you need some mechanism to make it stop. If an agent gets stuck, do
40:47
you have a mechanism to unstick the agent? If it's stuck at firing a tool or it's stuck on one particular point that
40:53
it keeps looping back to. If there are messages that are way too long, then maybe you remove those old messages from
40:58
the context to keep it going. Then you alert a human. And this is again where human in a loop is very helpful because you might need one to just push the
41:05
conversation along. Otherwise, if life is all good, you can keep going. You can save the conversation history. You can
41:10
create an activity report. But genuinely looking at the system, I've never seen a company that has implemented this one at
41:18
all, two properly, or three in a really scalable manner. This would make a really good YouTube video, but not a
41:24
really good production system. So, in terms of when to use this, I would personally tell you you probably don't want to do this, even though it looks
41:30
beautiful. It sounds great. Unless you're trying to build a prototype system of automating an entire company
41:36
with just agents, I'm sure it's possible with some implementation. But you probably could do much more useful
41:43
things with that time that are more deterministic and reliable because as language models change, you'd have to
41:49
basically create your own framework for how all of these systems should work. I don't think you'll be able to pull something off the shelf like a crew AI
41:55
and be like, "Cool, this is the system that we're going to depend our whole company on." If you are going to do it then enterprise level makes sense
42:01
because you need tons of resources, engineers, you need proper production and for the other ones you can see here
42:07
one of the use cases that popped up was smart city systems. So this is very complex. This is at a very very high
42:13
level. Now the one key pro here I want to dial in on is fault isolation. So in this system if you manage it properly
42:20
you can know exactly which agent is the culprit for a particular issue or what happens when all the agents go back and
42:26
forth and have conflict. you can basically root everything that happens. Whereas in a real company, sometimes you
42:32
can't pin down exactly why something didn't work. Was it a personnel issue? Was it issues within the personnel? You
42:39
can't necessarily have full big brother intelligence over what's happening. But here you can. And the cons speak for
42:44
themselves where you have a lot of complexity, a lot of debugging. You have to see all the states of the agents at a
42:50
particular point in time. You have to keep track that the context of the conversation isn't getting overloaded,
42:56
that the agents themselves are speaking the same language literally or at least the language that you've designated them
43:02
to have. This next pattern might be new to a lot of you and it's called resourceaware optimization. What it
Pattern 15: Resource-Aware Optimization (route by cost/complexity)
43:08
means is analyzing a task complexity and then routing to appropriate resources.
43:13
So simple tasks use cheap, fast models, but complex tasks use powerful but
43:19
expensive models. Think of something like GPT5 where there was a huge uproar because we lost all of our models. Then
43:25
we got either quick thinking, kind of thinking, hard thinking or like
43:31
professional thinking. Each one of those would route your request in chat GBT to the model that it thought would be the
43:37
best suited for that particular outcome. So the analogy here is a playful one where it's like choosing between
43:43
walking, a bus or a taxi depending on the distance, the urgency or the budget.
43:49
So you get a task and then based on that task's complexity, you set a budget. That budget could be a token limit, a
43:56
time constraint, a money budget on how much you're willing to spend for that kind of inference or that kind of API.
44:02
Then you have a router agent classify that complexity, whether it's simple, medium, complex, and if it's unknown, it
44:09
has to run a quick test to maybe check the confidence of how sure it is as to whether it's simple or complex. If it's
44:16
simple, then maybe it goes to a small model. If it's medium, then a standard model. And naturally, if it's more
44:22
complex, then a reasoning model of sorts. And then once you execute the tasks, you monitor resources. You look
44:28
at the token count and response time as well as API costs. Maybe you have some form of function that's keeping track of
44:34
the rolling cost. And as long as it's within limits, then you're good to go. It keeps continue processing until the
44:41
task is complete. And then you finally get whatever the outcome is, a report or something along those lines. And if
44:47
you're not within the limit, then you need some form of optimization. So either you need to cut away from the
44:52
context in your prompts for the agents or you need to take advantage of something called prompt caching where
44:59
essentially you have a language model physically cache results for up to an hour. So you can keep referencing and
45:05
sending that prompt over without having to send all that context over and over again. Then naturally, one of the best
45:11
fallbacks would be just to switch to a cheaper model across the board. If you're finding that even your complex
45:16
cases could be solved by potentially chaining multiple LLMs and this is where you start having a combination of design
45:23
patterns where knowing about that prompt chaining in number one is helpful now because now you have different ways that
45:30
you can pivot and implement your system. So this is useful to use when you have costs sensitive operations, high volume
45:36
processing, or you have budget constraints and you have a very large system where you need to keep track of
45:41
every single dollar being passed through because maybe you're running this at thousands or millions. And you won't
45:46
most likely see this workflow for a momand pop business or a small medium business. This will be more enterprise
45:52
and larger size platforms. The pro is naturally cost reduction. That was what all the uproar around GPD5 was is it was
45:59
seen as a costcutting act to route as many requests as possible to the
46:04
cheapest language model while still charging you that 20 bucks a month. So that was a pro. But in terms of the con
46:10
is you have complexity increase. You have tuning challenges. It's hard to necessarily know how often it's going to
46:17
go to simple versus complex. So your system and your rubric for what is complex and what is simple has to be
46:23
really robust and iron tight. And at the same time, you'll still have edge cases. So what does that system that looks at
46:29
confidence interval look like? All of this needs a lot of planning, a lot of resources, and a lot of testing. The
Pattern 16: Reasoning Techniques (CoT, ToT, self-consistency, debate)
46:35
next one are reasoning techniques. So this one in plain English means choosing the right method for the right problem.
46:41
So chain of thought for step-by-step logic. Tree of thought, a very interesting technique. It's actually one of my favorite for different use cases
46:48
that need creativity and imagination for exploring multiple paths. So this one is
46:53
like solving a puzzle by trying different strategies until one finally works. So while you might not find this
46:59
fun, I find this one particularly fun. So you have a complex problem and then you want to find a reasoning method to
47:05
help you solve set problem. So you can either go sequential where you have chain of thought which is very similar
47:11
to prompt chaining where you break it up into steps. You do step one, you think, you reason, then you conclude and then
47:18
step two or the possible second path could be branching where you have tree of thought. Very interesting technique
47:24
for you to take a look at. You generate literal branches of thought. You explore each one of those paths. You evaluate
47:31
which one seems the most viable. And then you do what's called pruning. And pruning is essentially if you have many
47:36
branches, you cut off the dead branches or the ones you want to be dead because you have a path forward you've decided
47:42
on. And then you have a few other methods where you combine multiple of these methods and you combine it with
47:47
self-consistency. You generate multiple solutions. So multiple solution paths and you score them. And then you have a
47:54
few other ones where you have adversarial where you have a debate method where you have a proponent agent and an opponent agent. It's kind of like
48:00
having your mini parliament where you have two agents go back and forth until one wins and exchange arguments and then
48:06
based on those arguments you decide what is the best path forward. So the key thing here is that you basically do all
48:12
of these and then you score all the solutions here and then based on the rubric that you come up with, you run
48:18
tests, you validate logic, you rank the candidates of which method is the best based on your specific complex problem.
48:25
You then select the best one and you can either combine all of them or you can
48:30
create one single one. So you could say I just want to use tree of thought based on this rubric or you know what I think
48:36
that I'll do the prompt chaining and then train of thought because I see some synergies here. Little disclaimer here
48:41
is knowing exactly how these methods work is very fundamental to actually
48:46
making this work. So this is on the end of the spectrum in my opinion. This is advanced. So in terms of when to use this, like I said, advanced technique.
48:53
So only for very complex things, mathematical reasoning, strategic planning at scale if you really need it.
49:00
But nine times out of 10, you won't need it. But this is a very interesting workflow to get into once you graduate
49:06
to that level of prompt engineering. So out of all of these, one of the most interesting applications could be both legal analysis and medical diagnosis
49:13
because some of these problems in both of these domains are very meaty and very complex and need very creative ways to
49:20
break them down. The pros of this method is that you're very exhaustive and robust in your process. But the cons is
49:25
that you have a lot of token consumption complexity. There is such a thing as overthinking with language models the
49:31
same way that you and I can overthink as well. So that can increase your latency, explode your cost and combinations. So
49:38
even though this is cool, it's not necessarily cool for every use case. It's not cool for 90% plus of use cases.
49:45
To me, this is highly experimental and you do this if you have a lot of bandwidth or free time or willing to put
49:52
some resources behind this to see whether or not it makes sense. This next one is about evaluation and monitoring.
Pattern 17: Evaluation & Monitoring (golden sets, SLAs, drift)
49:57
And we're finally back to normal English words that we can understand. So this is about setting up quality gates and
50:03
golden tests before deployment and continuously monitoring accuracy, performance, cost and drift in
50:10
production. And what drift is is when you have the same model or the same suite of models output one response but
50:17
over time that response degrades or gets worse or more unpredictable. In terms of the analogy to conceptualize it, you can
50:23
think of it as a factory quality control system that checks products at every stage. So you can imagine an assembly
50:29
line where one person is taking care of the wheels or one person is taking care of the door and making sure that the
50:35
actual cover of the car is proper etc. So how this could work is you could have some system deployed and then you define
50:41
some quality gates. So the quality criteria could be accuracy metrics, it
50:46
could be performance SLAs's, it could be compliance, it could be user experience. Then for each one you have the specific
50:53
metric. So for accuracy metric there should be some golden test sets. For performance, it could be some
50:58
performance benchmarks. And then you keep going depending on the specific type of metric. And depending on what you decide on, it could be all of them.
51:05
You create a test suite where you do unit tests, contract tests, integration tests, you have some critical path
51:12
tests. And this is very comprehensive again and very robust of a testing system. And you want to assess whether
51:17
or not your case actually deserves something like this. And in terms of analyzing patterns, the whole point of this is to do things like detecting
51:24
drifts, finding regressions from the mean, which means that if the mean is the average, if the average thing stops
51:31
happening, and you find something that's two standard deviations or very different from what's expected, this is
51:37
what's called a regression. And this also gives you the ability to look for anomalies, identify trends, and then you
51:42
can set a threshold as to when you decide that any of these or all of these have failed. And if so, you can do
51:48
something like alerting a team. They investigate the issue. Again, you have a human in the loop there. And you keep
51:53
going. And ideally, you conduct periodic audits to make sure that your systems, your mechanisms, your evaluation sets
52:00
all are up to date and as expected. So, this is definitely some form of quality assurance that you'd want to employ with
52:07
production grade systems. And where this might make sense again is enterprise, SAS, healthcare, especially the finance
52:13
industry might benefit from this and very large scale e-commerce. So, one of the biggest pros here is naturally that
52:19
you have more reliability, but the corresponding con is not only alert fatigue, but also performance impact
52:25
where you need a system that's so robust that can handle this level of scrutiny and testing on a very large scale. So,
52:32
when I hear things like AI is going to take everyone's job, I start laughing because I don't know of a single AI
52:38
framework that could do this kind of infrastructure setup at scale. I've never seen it. I don't think we will see
Pattern 18: Guardrails & Safety (PII, injection, sandboxing)
52:44
it from just language models, at least for a long time. So guardrails and safety patterns are derivative somewhat
52:49
of what we just saw before. So this one's about checking all the inputs for harmful content, personal info or
52:55
injection attacks. So this is much more top offunnel of that entire infrastructure. So you're classifying
53:00
risk levels and apply appropriate controls. So the main analogy here is airport security where you have multiple
53:07
checkpoints where someone asks you for things like your passport, your boarding pass, and then as you go through their
53:13
job is to make sure to look for threats. So when it comes to your input being received, you then have to sanitize that
53:18
input. Then you want to check what that input is. Is it some form of personal identifiable information or PII, in
53:25
which case you want to detect it and maybe redact it. So if it's someone's SIN number, maybe you take off the whole
53:31
SIN number or you hash it or you replace all the numbers with apostrophes or asterisks or whatever, but you want to
53:37
find a way to mask anything that's very secure that shouldn't be going into your system. The next one could be injection
53:43
detection. They rhyme for a reason. So if someone's trying to break into your system, get access to your tables and
53:49
doing something called like a SQL injection where they try to retrieve all the data in your tables of your application. And this could be related
53:56
also to malicious content. So in both cases, you either want to filter this or you want to block it entirely. And this
54:02
is where you do risk classification where you assess is this low risk, medium or high. And if it's high, nine
54:08
times out of 10 you should involve a human in the loop. And then depending on the severity of low to medium then you
54:14
could either process it normally or process it with additional conditions or constraints then you execute the task.
54:21
You have some form of output moderation where you check the policies the ethical guidelines the compliance brand safety
54:28
you create a safety score and then if that score is above a threshold then you have tool restrictions or you put it in
54:34
a sandbox environment and then if there is nothing above the threshold then you just allow the input and the system
54:40
keeps on going. So a system like this would be used especially when PR is on the line. Something public facing, a big
54:46
system representing the government would be on the line. This is where you'd need all of these checks and balances to make
54:51
sure that very few people can send an input that is malicious that won't be
54:57
caught downstream in the system. Ideally, the more upstream you can find the issue, the sooner you can make sure
55:02
that the rest of the system is not compromised. So from having built for enterprise, I can tell you that one of
55:07
the best vectors for malicious injections is anything with an open text box or chat bots, which is why I
55:14
typically recommend as well as my team that if you create an application that's customerf facing and you have thousands
55:20
or tens of thousands of users, then doing a pre-prompted strategy is probably better where you have already
55:26
canned responses or canned prompts you can click on where there's no open text box. you can only go through a series of
55:33
clicking through a journey. The pros is you definitely get a lot more risk mitigation. This is better for
55:38
compliance and brand protection and user safety most importantly. But the cons is you could have some false positives
55:45
where things that look malicious aren't malicious and vice versa. You're obviously going to have some user frustration if the system is being
55:52
adding way too much friction in the process. But you have to balance that level of friction with your need for safety, which obviously safety should
55:58
take precedence. All right, we're almost there. This is the second last design pattern which is prioritization. So this
Pattern 19: Prioritization (value×effort×urgency×risk, re-order)
56:04
is about scoring tasks based on value, risk, effort and urgency. So the
56:09
strategy in this pattern is you build something called a dependency graph to understand what needs to happen first.
56:15
What in sequence needs to happen before the next following actions can follow after. And if you want one of my
56:21
beautiful analogies, it's like having an emergency room triage system that handles the most critical cases first,
56:27
but it makes sure that everyone gets seen eventually. So basically you have a task and then you build this dependency
56:32
graph and this is what it could look like where you have a task list. You have task one 2 3 4 all the way to not
56:39
infinity but maybe 100 tasks. Then you score each task based on a series of
56:45
scoring factors. So some of these factors could be dependency count. So how many things are affected by this
56:51
thing being solved or not being solved. time sensitivity, effort required, risk
56:56
level, business value, and all of them go together to get some form of overall priority score. Once you yield that
57:03
priority score, that's where you have something where you multiply value and effort times urgency by risk. And
57:09
obviously, you can make this priority formula whatever you want. But in this case, this is the template you can use
57:14
to do that. So then you rank the tasks based on the scores. You have an initial order right here. Then you have a
57:20
scheduling strategy where either you're doing something like load balancing, task aging, applying quotas, and
57:26
depending on what it is we're actually applying this for, it goes through this process. It gets prioritized in a queue.
57:32
Then you execute the top task, you go through, you then double check whether or not priorities have shifted after
57:38
changing the first task. So once you execute the top task, you shouldn't necessarily go to the next sequence of
57:44
events. You should assess whether or not there is a new priority. If there is a new priority, then maybe you push
57:50
forward whatever was next. You save the state and then you go to the new event
57:55
section. You recalculate the priorities accordingly. So to make this a lot more tactical and less airy fairy in the sky.
58:02
Imagine you were starting your day out and your number one goal was to go to the gym, then come back home and eat,
58:08
and then go to work. But what if you went to the gym, you left the gym, there was a huge accident on the highway or
58:14
the street, and now you're an hour late. Maybe you skip going back home to nourish yourself and you go to a
58:20
drive-thru along the way before you go to work. In this case, doing action number one presented environment number
58:25
two where you had to reassess the state and then change the course of action. So, using that example as a segue,
58:32
dynamic environments could be one major application of where this makes sense. where your initial plan might change
58:39
because the first thing you do might cause a ripple effect of additional variables coming into the equation that
58:46
change the next natural action that you should do. So this would make sense in task management systems, customer
58:51
service, manufacturing, healthcare and devops. So the key value here is obviously adaptability and transparency.
58:58
But the downside would be something like context switching where maybe you assess every single time especially if you're
59:04
using generative AI based agents and it reassesses the next natural action or the new priority in a different light in
59:11
one run versus the other run. So not having a deterministic way to assess whether or not you should go off course
59:18
and reassess the priorities becomes the hardest part of the system, especially if the environment or the dynamic
59:23
environment you're applying this in has edge cases and variables all the time. And last but not least, you have
Pattern 20: Exploration & Discovery (map space, cluster, probe)
59:29
exploration and discovery where this in plain English is starting by broadly exploring the knowledge space across
59:35
papers, data, and expert sources and identifying patterns and clustering them
59:40
into themes. And this one is like a detective gathering clues from everywhere, finding patterns, then
59:46
focusing on the most promising leads. So this one starts out with a research goal. Then from that goal, you explore
59:52
your sources, whether it's domain experts, data sets, academic papers. Then you compile all that information
59:58
into one spot. You map the what's called knowledge space. You identify the key areas of interest and then you go to
1:00:06
cluster the themes. And what clustering means in plain English is that you have a series of data points that you can
1:00:11
converge and bring together to be able to assess apples to apples, oranges to oranges and see if there are patterns
1:00:17
are existing. Once you assess those patterns, you then go through some selection criteria. We look at some form
1:00:23
of a novelty score, potential impact, knowledge gaps, feasibility. And the whole point of this is to pick where you
1:00:29
should actually explore and you should target. And once you know that and you dial in, this is kind of like a research
1:00:36
agent design pattern where it's just researching what is worth pursuing. And once you do that deep investigation, you
1:00:42
extract some artifacts. These artifacts could be conceptual models, they could be expert contacts, they could be
1:00:48
curated data sets, bibliographies, whatever it is contextually specific that you're doing. And once you
1:00:54
synthesize these insights, you extract key insights, add some open questions, and maybe generate some hypotheses, you
1:01:01
go through and loop until you come to a point where you conclude your exploration and you have a generated
1:01:07
report if that is the output you're looking for. You document your findings and then you recommend the next steps.
1:01:12
So if I zoom out for a second, you can imagine this as the system responsible for things like perplexity deep
1:01:18
research, claw deep research. Anything that has to go the next natural mile will take 40 minutes, spin up multiple
1:01:24
agents to execute that research and scope out what is worth looking at versus what's not worth looking at.
1:01:30
Which citations are worth including in the final analysis versus not. So this is a full research agent design pattern.
1:01:36
And with that, there should be no surprise that the best place to use this is for research projects as well as
1:01:42
anywhere where you need to do some form of really detailed competitive analysis. And where it fits is research of all
1:01:47
kinds including academic R&D departments. And one really cool use case is drug discovery. Now the key
1:01:53
thing here is innovation enablement where the agent can decide what is worth pursuing or what topic and what angle of
1:02:01
that topic is worth diving into. And then on the con side, the obvious con is
1:02:06
that it's timesensitive, very resource heavy. There's a lot of generative AI being used here and also sifting through
1:02:12
very large documents and zooming through to see what is relevant and what's not relevant. And I know this was a longer
1:02:17
video, but now that sums up 20 different design patterns and there are 21 in the book itself, but I excluded MCPS just
1:02:25
because I have covered it over and over again. But wait, we're not done yet. I do have a free gift for all of you. So,
1:02:32
all of this work I put together is in this repository that I made available in the second link in the description
1:02:37
below. It includes all the patterns I mentioned from this book as well as a series of aski art. And as art is one of
1:02:44
my new things I'm nerding out on where it basically breaks down what this looks like step by step. And then if you go
1:02:50
back to the last one, if you go to the mermaid diagrams, this covers a lot of the diagrams that I went through in
1:02:56
detail. So you have access to everything that I put together and it will help you really level up your agentic
1:03:02
understanding so you can apply this and be a master of the craft. Now if this very long video was helpful for you, it
1:03:08
helped save you the time to read the book, then I'd super appreciate if you left a comment down below so that the algo can give this some extra love. And
1:03:15
the best thank you you can give me is sharing this with someone else to increase the visibility of the video as
1:03:20
well as the channel. And if you want to go even deeper on things like agentic patterns and prompt engineering and
1:03:26
everything that's involved in becoming the super AI generalist of your dreams, then check out the first link in the
1:03:31
description below. I run a community where I put my heart and soul and do all this kinds of stuff every single day
1:03:36
pretty much. So check out that first link and maybe I'll see you inside. I'll see you in the next one.