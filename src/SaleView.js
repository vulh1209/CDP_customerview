import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoWrap = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const LeadInfo = styled.table`
  width: 70%;
  margin: 2rem 0rem;
`;
const LeadScore = styled.div`
  width: 90%;
`;
const BehaviourWrap = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default function SaleView() {
  const [SelectedLeads, setSelectedLeads] = useState();
  const [Behaviours, setBehaviours] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const id = window.location.pathname.split("/")[1];
      console.log(1,id);
      const res1 = await fetch(`http://125.234.107.177:43000/lead/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const lead = await res1.json();
      console.log(lead);
      setSelectedLeads(lead);
      const res2 = await fetch(`http://125.234.107.177:43000/behavior/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
      });
      const behaviour = await res2.json();
      console.log(behaviour);
      setBehaviours(behaviour);
    };
    loadData();
  }, []);

  return (
    <Wrap>
      <Router>
        <Switch>
          <Route path="/">
            {SelectedLeads && (
              <>
                <InfoWrap>
                  <h2>Information</h2>
                  <LeadInfo>
                    <tr>
                      <td>ID</td>
                      <td>{SelectedLeads.id}</td>
                    </tr>
                    <tr>
                      <td>Fullname</td>
                      <td>{SelectedLeads.fullname}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{SelectedLeads.email}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{SelectedLeads.phone}</td>
                    </tr>
                    <tr>
                      <td>Source</td>
                      <td>{SelectedLeads.source}</td>
                    </tr>
                  </LeadInfo>
                  <h2>Score</h2>
                  <LeadScore>
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell width="5%">Name</Table.HeaderCell>
                          <Table.HeaderCell width="5%">Email</Table.HeaderCell>
                          <Table.HeaderCell width="5%">Phone</Table.HeaderCell>
                          <Table.HeaderCell width="5%">Source</Table.HeaderCell>
                          <Table.HeaderCell width="5%">
                            Pageview
                          </Table.HeaderCell>
                          <Table.HeaderCell width="5%">
                            Open mail
                          </Table.HeaderCell>
                          <Table.HeaderCell width="5%">
                            Click mail
                          </Table.HeaderCell>
                          <Table.HeaderCell width="5%">Star</Table.HeaderCell>
                          <Table.HeaderCell width="5%">Action</Table.HeaderCell>
                          <Table.HeaderCell width="5%">Booked</Table.HeaderCell>
                          <Table.HeaderCell width="5%">
                            Address
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_fullname}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_email}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_phone}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_source}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_pageview}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_openmail}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_clickmail}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_star}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_action}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_booked}
                          </Table.Cell>
                          <Table.Cell textAlign="center">
                            {SelectedLeads.score_address}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                      <Table.Footer></Table.Footer>
                    </Table>
                  </LeadScore>
                </InfoWrap>
                <BehaviourWrap>
                  <h2>Behaviour</h2>
                </BehaviourWrap>
              </>
            )}
          </Route>
        </Switch>
      </Router>
    </Wrap>
  );
}
