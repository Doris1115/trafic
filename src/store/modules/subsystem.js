const subsystem = {
    state: {
        subsystemId: "-1"
    },

    mutations: {
        SET_SUBSYSTEM_ID: (state, subsystemId) => {
            state.subsystemId = subsystemId
        }
    },

    actions: {
        ChangeSubsystem({ commit }, subsystem) {
            console.log('in subsystem change' + subsystem.subsystemId)
            commit('SET_SUBSYSTEM_ID', subsystem.subsystemId)
        }

    }
}

export default subsystem